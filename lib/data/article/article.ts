import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { PublishedStatus } from "@/lib/generated/prisma/enums";

type GetAllArticlesOptions = {
    status?: PublishedStatus
    categoryName?: string
    search?: string
    page?: number
    limit?: number
}


export const getAllArticles = cache(async (options: GetAllArticlesOptions = {}) => {
    try {
        const normalizedPage = Math.max(1, options.page ?? 1)
        const normalizedLimit = Math.max(1, options.limit ?? 10)
        const skip = (normalizedPage - 1) * normalizedLimit
        const search = options.search?.trim()
        const where = {
            deletedAt: null,
            ...(options.status ? { status: options.status } : {}),
            ...(options.categoryName ? { category: { name: options.categoryName } } : {}),
            ...(search ? { title: { containts: search, mode: "insensitive" as const } } : {})
        }
        const [articles, totalItems] = await Promise.all([
            prisma.article.findMany({
                where,
                include: { category: true },
                orderBy: { updatedAt: "desc" },
                skip, take: normalizedLimit
            }),
            prisma.article.count({ where })
        ])
        return {
            data: articles,
            totalItems,
            pagination: {
                page: normalizedPage,
                limit: normalizedLimit,
                totalPages: Math.ceil(totalItems / normalizedLimit)
            }
        }
    } catch (err) {
        console.error("Failed to fetch articles: ", err)
        return {
            data: [],
            totalItems: 0,
            pagination: {
                page: options.page ?? 1,
                limit: options.limit ?? 10,
                totalPages: 0
            }
        }
    }
})


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
            where: { id },
            include: { category: true }
        })
    } catch (err) {
        console.error("Failed to fetch training by id: ", err)
        return null
    }
})

export const getTotalArticles = cache(
    async (options?: { status?: PublishedStatus }) => {
        try {
            return await prisma.article.count({
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
