import { cache } from "react";
import { prisma } from "../../prisma";

// Get Article Where Status = Published
export const getPublishedArticles = cache(
    async (options?: { categoryName?: string; take?: number }) => {
        try {
            return await prisma.article.findMany({
                where: {
                    status: "PUBLISHED",
                    deletedAt: null,
                    ...(options?.categoryName
                        ? { category: { name: options.categoryName } }
                        : {}
                    ),
                },
                include: { category: true },
                orderBy: {
                    createdAt: "desc",
                },
                take: options?.take,
            });
        } catch (err) {
            console.error("Failed to fetch articles: ", err);
            return []; // Return array kosong agar halaman tidak crash total
        }
    }
);

// Get All Article
export const getArticleBySlug = cache(
    async (slug: string) => {
        try {
            return await prisma.article.findUnique({
                where: {
                    slug,
                    deletedAt: null
                },
                include: {
                    category: true,
                    seo: true
                }
            })
        } catch (err) {
            console.error("Failed to fetching article by slug: ", err)
            return null
        }
    }
)

export const getArticleById = cache(async (id: string) => {
    try {
        return await prisma.article.findUnique({
            where: {id},
            include: {category: true}
        })
    } catch (err) {
        console.error("Failed to fetch training by id: ", err)
        return null
    }
})

export const getAllArticlesForAdmin = cache(async () => {
    try {
        return await prisma.article.findMany({
            where: { deletedAt: null },
            include: { category: true },
            orderBy: { updatedAt: "desc" },
        });
    } catch (err) {
        console.error("Failed to fetch articles for admin: ", err);
        return [];
    }
});

export const getTotalArticles = cache(async () => {
    try {
        return await prisma.article.count()
    } catch (err) {
        console.error("failed to fetch total data: ", err)
        return null
    }
})