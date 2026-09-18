import { prisma } from "@/lib/prisma";
import { cache } from "react";
import { TrainingScheduleStatus, TrainingScheduleType } from "@/lib/generated/prisma/enums";
import { computeScheduleStatus } from "@/lib/utils/trainingScheduleStatus";

type GetAllSchedulesOptions = {
    trainingId?: string
    type?: TrainingScheduleType
    status?: TrainingScheduleStatus // filter berdasar niat admin (kolom mentah, bukan computed)
    search?: string  // cari by nama training
    page?: number
    limit?: number
}

/** Ambil jumlah pendaftar APPROVED untuk N schedule sekaligus (hindari N+1 query) */
async function getApprovedCountsMap(scheduleIds: string[]) {
    if (scheduleIds.length === 0) return new Map<string, number>();
    const grouped = await prisma.trainingRegistration.groupBy({
        by: ["trainingScheduleId"],
        where: { trainingScheduleId: { in: scheduleIds }, status: "APPROVED", deletedAt: null },
        _count: { _all: true }
    });
    return new Map(grouped.map(g => [g.trainingScheduleId, g._count._all]));
}

export const getAllSchedules = cache(async (options: GetAllSchedulesOptions = {}) => {
    try {
        const normalizedPage = Math.max(1, options.page ?? 1)
        const normalizedLimit = Math.max(1, options.limit ?? 10)
        const skip = (normalizedPage - 1) * normalizedLimit
        const search = options.search?.trim()

        const where = {
            deletedAt: null,
            ...(options.trainingId ? { trainingId: options.trainingId } : {}),
            ...(options.type ? { type: options.type } : {}),
            ...(options.status ? { status: options.status } : {}),
            ...(search ? { training: { title: { contains: search, mode: "insensitive" as const } } } : {})
        }

        const [schedules, totalItems] = await Promise.all([
            prisma.trainingSchedule.findMany({
                where,
                include: { training: { select: { id: true, title: true, slug: true } } },
                orderBy: { startAt: "desc" },
                skip, take: normalizedLimit
            }),
            prisma.trainingSchedule.count({ where })
        ])

        const countsMap = await getApprovedCountsMap(schedules.map(s => s.id))
        const data = schedules.map(s => ({
            ...s,
            approvedCount: countsMap.get(s.id) ?? 0,
            displayStatus: computeScheduleStatus(s, countsMap.get(s.id) ?? 0)
        }))

        return {
            data,
            totalItems,
            pagination: {
                page: normalizedPage,
                limit: normalizedLimit,
                totalItems,
                totalPages: Math.max(1, Math.ceil(totalItems / normalizedLimit))
            }
        }
    } catch (err) {
        console.error("Failed to fetch training schedules: ", err)
        return {
            data: [],
            totalItems: 0,
            pagination: { page: options.page ?? 1, limit: options.limit ?? 10, totalItems: 0, totalPages: 1 }
        }
    }
})

export const getScheduleById = cache(async (id: string) => {
    try {
        const schedule = await prisma.trainingSchedule.findUnique({
            where: { id, deletedAt: null },
            include: { training: { select: { id: true, title: true, slug: true } } }
        })
        if (!schedule) return null

        const approvedCount = await prisma.trainingRegistration.count({
            where: { trainingScheduleId: id, status: "APPROVED", deletedAt: null }
        })

        return {
            ...schedule,
            approvedCount,
            displayStatus: computeScheduleStatus(schedule, approvedCount)
        }
    } catch (err) {
        console.error("Failed to fetch schedule by id: ", err)
        return null
    }
})

/** Untuk halaman publik — hanya schedule dari training yang PUBLISHED, batch terbaru dulu */
export const getPublicSchedulesByTraining = cache(async (trainingId: string) => {
    try {
        const schedules = await prisma.trainingSchedule.findMany({
            where: {
                trainingId,
                deletedAt: null,
                status: { in: ["OPEN", "CLOSED"] } // DRAFT & CANCELLED tidak pernah tampil publik
            },
            orderBy: { startAt: "asc" }
        })

        const countsMap = await getApprovedCountsMap(schedules.map(s => s.id))
        return schedules.map(s => ({
            ...s,
            approvedCount: countsMap.get(s.id) ?? 0,
            displayStatus: computeScheduleStatus(s, countsMap.get(s.id) ?? 0)
        }))
    } catch (err) {
        console.error("Failed to fetch public schedules: ", err)
        return []
    }
})

export const getTotalSchedules = cache(async (options?: { status?: TrainingScheduleStatus }) => {
    try {
        return await prisma.trainingSchedule.count({
            where: { deletedAt: null, ...(options?.status ? { status: options.status } : {}) }
        })
    } catch (err) {
        console.error("Failed to count schedules: ", err)
        return 0
    }
})