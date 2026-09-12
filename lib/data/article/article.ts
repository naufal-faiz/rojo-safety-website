import { cache } from "react";
import { prisma } from "../../prisma";
import { revalidatePath } from "next/cache";

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
                include: { seo: true },
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
                    // seo: true
                }
            })
        } catch (err) {
            console.error("Failed to fetching article by slug: ", err)
            return null
        }
    }
)