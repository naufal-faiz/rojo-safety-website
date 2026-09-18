"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { PublishedStatus } from "@/lib/generated/prisma/client"

import sanitizeHtml from "sanitize-html"

type DraftInput = {
    id?: string
    title: string
    slug: string
    thumbnail: string
    content: string
    excerpt?: string
    articleCategoryId: string
    status?: PublishedStatus
}

export async function saveDraft(input: DraftInput) {
    const slugValue = input.slug?.trim() || `draft-${Date.now()}`
    
    // Sanitize konten HTML sebelum disimpan ke database
    const cleanContent = sanitizeHtml(input.content || "", {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'iframe', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div']),
        allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            '*': ['style', 'class', 'id'],
            'img': ['src', 'alt', 'title', 'width', 'height'],
            'iframe': ['src', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen']
        },
        allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com']
    })

    // Jika input id tidak null
    if (input.id) {
        const updated = await prisma.article.update({
            where: { id: input.id },
            data: {
                title: input.title || "Tanpa Judul",
                slug: slugValue,
                thumbnail: input.thumbnail,
                content: cleanContent,
                excerpt: input.excerpt,
                status: (input.status as PublishedStatus) || "DRAFT",
                articleCategoryId: input.articleCategoryId,
            },
        })
        revalidatePath("/admin/artikel")
        revalidatePath(`/admin/artikel/${input.id}`)
        return { id: updated.id, status: updated.status }
    }

    const created = await prisma.article.create({
        data: {
            title: input.title || "Tanpa Judul",
            slug: slugValue,
            thumbnail: input.thumbnail || "/images/no-image.jpg",
            content: cleanContent,
            excerpt: input.excerpt || "",
            status: (input.status as PublishedStatus) || "DRAFT",
            articleCategoryId: input.articleCategoryId,
        },
    })
    revalidatePath("/admin/artikel")
    return { id: created.id, status: created.status }
}

export async function publishArticle(id: string) {
    const updated = await prisma.article.update({
        where: { id },
        data: {
            status: "PUBLISHED",
            publishedAt: new Date(),
        },
    })
    revalidatePath("/admin/artikel")
    revalidatePath(`/admin/artikel/${id}`)
    revalidatePath("/artikel")
    return { success: true, article: updated }
}

export async function softDeleteArticle(id: string) {
    const softDeleted = await prisma.article.update({
        where: { id },
        data: {
            deletedAt: new Date(),
        }
    })
    revalidatePath("/admin/artikel")
    return { success: true, article: softDeleted }
}

// Sistem autodelete 30 hari setelah deletedAt != null
export async function deleteArticle(id: string) {
    await prisma.article.delete({
        where: { id },
    })
    revalidatePath("/admin/artikel")
    return { success: true }
}
