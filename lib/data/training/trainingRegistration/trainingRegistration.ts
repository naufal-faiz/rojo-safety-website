import { prisma } from "@/lib/prisma";
import { cache } from "react";
import { RegistrationStatus } from "@/lib/generated/prisma/enums";

type GetAllRegistrationsOptions = {
    trainingScheduleId?: string
    status?: RegistrationStatus
    search?: string // by nama / email
    page?: number
    limit?: number
}

export const getAllRegistrations = cache(async (options: GetAllRegistrationsOptions = {}) => {
    try {
        const normalizedPage = Math.max(1, options.page ?? 1)
        const normalizedLimit = Math.max(1, options.limit ?? 10)
        const skip = (normalizedPage - 1) * normalizedLimit
        const search = options.search?.trim()

        const where = {
            deletedAt: null,
            ...(options.trainingScheduleId ? { trainingScheduleId: options.trainingScheduleId } : {}),
            ...(options.status ? { status: options.status } : {}),
            ...(search ? {
                OR: [
                    { name: { contains: search, mode: "insensitive" as const } },
                    { email: { contains: search, mode: "insensitive" as const } }
                ]
            } : {})
        }

        const [registrations, totalItems] = await Promise.all([
            prisma.trainingRegistration.findMany({
                where,
                include: {
                    schedule: {
                        select: { id: true, batch: true, startAt: true, training: { select: { title: true } } }
                    }
                },
                orderBy: { createdAt: "desc" },
                skip, take: normalizedLimit
            }),
            prisma.trainingRegistration.count({ where })
        ])

        return {
            data: registrations,
            totalItems,
            pagination: {
                page: normalizedPage,
                limit: normalizedLimit,
                totalItems,
                totalPages: Math.max(1, Math.ceil(totalItems / normalizedLimit))
            }
        }
    } catch (err) {
        console.error("Failed to fetch registrations: ", err)
        return {
            data: [],
            totalItems: 0,
            pagination: { page: options.page ?? 1, limit: options.limit ?? 10, totalItems: 0, totalPages: 1 }
        }
    }
})

export const getRegistrationCountsByStatus = cache(async (trainingScheduleId: string) => {
    try {
        const grouped = await prisma.trainingRegistration.groupBy({
            by: ["status"],
            where: { trainingScheduleId, deletedAt: null },
            _count: { _all: true }
        })
        return {
            pending: grouped.find(g => g.status === "PENDING")?._count._all ?? 0,
            approved: grouped.find(g => g.status === "APPROVED")?._count._all ?? 0,
            rejected: grouped.find(g => g.status === "REJECTED")?._count._all ?? 0,
        }
    } catch (err) {
        console.error("Failed to count registrations by status: ", err)
        return { pending: 0, approved: 0, rejected: 0 }
    }
})