import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getAllArticleCategories = cache(async (options?: {take?: number}) => {
    try {
        return await prisma.articleCategory.findMany({
            where: {deletedAt: null},
            orderBy: {
                createdAt: "asc"
            },
            take: options?.take
        })
    } catch(err) {
        console.error("Failed to fetch category: ", err);
        return []
    }
})