import { prisma } from "@/lib/prisma";
import { cache } from "react";

type GetArticleCategoriesOptions = {
    search?: string;
    page?: number;
    limit?: number;
};

export const getAllArticleCategories = cache(
    async ({ search = "", page = 1, limit = 10, }: GetArticleCategoriesOptions = {}) => {
        try {
            const normalizedPage = Math.max(1, page);
            const normalizedLimit = Math.max(1, limit);
            const skip = (normalizedPage - 1) * normalizedLimit;
            const where = {
                deletedAt: null,
                ...(search.trim()
                    ? {
                        name: {
                            contains: search.trim(),
                            mode: "insensitive" as const,
                        },
                    }
                    : {}),
            };

            const [categories, totalItems, totalCategories,] = await Promise.all([
                prisma.articleCategory.findMany({
                    where,
                    orderBy: {
                        name: "asc",
                    },
                    skip,
                    take: normalizedLimit,
                }),
                prisma.articleCategory.count({ where }),
                prisma.articleCategory.count({ where: { deletedAt: null } }),
            ]);

            const totalPages = Math.max(1, Math.ceil(totalItems / normalizedLimit));
            return {
                data: categories,
                totalCategories,
                pagination: {
                    page: normalizedPage,
                    limit: normalizedLimit,
                    totalItems,
                    totalPages,
                },
            };
        } catch (error) {
            console.error("Failed to fetch article categories: ", error);

            return {
                data: [],
                totalCategories: 0,
                pagination: {
                    page: 1,
                    limit,
                    totalItems: 0,
                    totalPages: 1,
                },
            };
        }
    }
);