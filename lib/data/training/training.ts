import { CertificationType, PublishedStatus } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getPublishedTrainings = cache(async () => {
    try {
        return await prisma.training.count({
            where: {
                deletedAt: null,
                status: "PUBLISHED",
            },
        });
    } catch (error) {
        console.error("Failed to count published trainings:", error);
        return 0;
    }
});

// Untuk halaman publik: hanya training yang sudah PUBLISHED
export const getAllTrainingData = cache(
    async (options?: { certificationType?: CertificationType; take?: number }) => {
        try {
            return await prisma.training.findMany({
                where: {
                    status: "PUBLISHED",
                    deletedAt: null,
                    ...(options?.certificationType ? { certification: options.certificationType } : {})
                },
                include: { category: true },
                orderBy: { createdAt: "desc" },
                take: options?.take
            })
        } catch (err) {
            console.error("Failed to fetch training data: ", err)
            return []
        }
    })

export const getTrainingDataBySlug = cache(async (slug: string) => {
    try {
        return await prisma.training.findUnique({
            where: { slug, deletedAt: null },
            include: { category: true, seo: true },
        })
    } catch (err) {
        console.error("Failed to fetching training data by slug: ", err)
        return null
    }
})

// Untuk admin: perlu bisa lihat draft & published, dicari by id
export const getTrainingById = cache(async (id: string) => {
    try {
        return await prisma.training.findUnique({
            where: { id, deletedAt: null },
            include: { category: true },
        })
    } catch (err) {
        console.error("Failed to fetch training by id: ", err)
        return null
    }
})

export const getAllTrainingsForAdmin = cache(async () => {
    try {
        return await prisma.training.findMany({
            where: { deletedAt: null },
            include: { category: true },
            orderBy: { updatedAt: "desc" },
        })
    } catch (err) {
        console.error("Failed to fetch trainings for admin: ", err)
        return []
    }
})

export const getTotalTrainings = cache(
    async (options?: { status?: PublishedStatus }) => {
        try {
            return await prisma.training.count({
                where: {
                    deletedAt: null,
                    ...(options?.status ? { status: options.status } : {})
                }
            })
        } catch (err) {
            console.error("failed to fetch total data: ", err)
            return null
        }
    })