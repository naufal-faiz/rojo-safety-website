import { CertificationType } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getAllTrainingData = cache(
    async (options?: { certificationType?: CertificationType; take?: number }) => {
        try {
            return await prisma.training.findMany({
                where: {
                    deletedAt: null,
                    ...(options?.certificationType ? { certification: options.certificationType } : {})
                },
                // include: {seo: true, category: true, schedules: true},
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
                // include: {seo: true, category: true, schedules: true},
        })
    } catch (err) {
        console.error("Failed to fetching training data by slug: ", err)
        return null
    }
})