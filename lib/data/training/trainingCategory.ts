import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getAllTrainingCategories = cache(async (options?: { take?: number }) => {
    try {
        return await prisma.trainingCategory.findMany({
            where: { deletedAt: null },
            orderBy: { name: "asc" },
            take: options?.take,
        });
    } catch (err) {
        console.error("Failed to fetch training categories: ", err);
        return [];
    }
});