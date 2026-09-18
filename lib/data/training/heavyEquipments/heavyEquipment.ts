import { prisma } from "@/lib/prisma";
import { cache } from "react";

type GetAllHeavyEquipmentsOptions = {
    trainingCategoryId?: string
    search?: string
    page?: number
    limit?: number
}

export const getAllHeavyEquipments = cache(async (options: GetAllHeavyEquipmentsOptions = {}) => {
    try {
        const normalizedPage = Math.max(1, options.page ?? 1)
        const normalizedLimit = Math.max(1, options.limit ?? 10)
        const skip = (normalizedPage - 1) * normalizedLimit
        const search = options.search?.trim()

        const where = {
            deletedAt: null,
            ...(options.trainingCategoryId ? { trainingCategoryId: options.trainingCategoryId } : {}),
            ...(search ? { name: { contains: search, mode: "insensitive" as const } } : {})
        }

        const [equipments, totalItems] = await Promise.all([
            prisma.heavyEquipment.findMany({
                where,
                include: { category: true },
                orderBy: { createdAt: "desc" },
                skip, take: normalizedLimit
            }),
            prisma.heavyEquipment.count({ where })
        ])

        return {
            data: equipments,
            totalItems,
            pagination: {
                page: normalizedPage,
                limit: normalizedLimit,
                totalItems,
                totalPages: Math.max(1, Math.ceil(totalItems / normalizedLimit))
            }
        }
    } catch (err) {
        console.error("Failed to fetch heavy equipments: ", err)
        return {
            data: [],
            totalItems: 0,
            pagination: { page: options.page ?? 1, limit: options.limit ?? 10, totalItems: 0, totalPages: 1 }
        }
    }
})

export const getHeavyEquipmentById = cache(async (id: string) => {
    try {
        return await prisma.heavyEquipment.findUnique({
            where: { id, deletedAt: null },
            include: { category: true }
        })
    } catch (err) {
        console.error("Failed to fetch heavy equipment by id: ", err)
        return null
    }
})

export const getHeavyEquipmentsByCategory = cache(async (trainingCategoryId: string) => {
    try {
        return await prisma.heavyEquipment.findMany({
            where: { trainingCategoryId, deletedAt: null },
            include: { category: true },
            orderBy: { name: "asc" }
        })
    } catch (err) {
        console.error("Failed to fetch equipments by category: ", err)
        return []
    }
})
