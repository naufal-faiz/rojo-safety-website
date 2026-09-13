"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createArticleCategory(name: string) {
    if (!name.trim()) throw new Error("Nama kategori tidak boleh kosong!")
    const created = await prisma.articleCategory.create({
        data: { name: name.trim() }
    })
    revalidatePath("/admin/artikel/kategori-artikel")
    return created
}

export async function updateArticleCategory(id: string, name: string) {
    if (!name.trim()) throw new Error("Nama kategori tidak boleh kosong!")
    const updated = await prisma.articleCategory.update({
        where: { id },
        data: { name: name.trim(), updatedAt: new Date() }
    })
    revalidatePath("/admin/artikel/kategori-artikel")
    return updated
}

export async function softDeleteArticleCategory(id: string) {
    const softDeleted = await prisma.articleCategory.update({
        where: { id },
        data: { deletedAt: new Date() }
    })
    revalidatePath("/admin/artikel/kategori-artikel")
    return { success: true, articleCategory: softDeleted }
}

// Delete after 30 days soft deleted
export async function hardDeleteArticleCategory(id: string) {
    const deleted = await prisma.articleCategory.delete({ where: { id } })
    revalidatePath("/admin/artikel/kategori-artikel")
    return { success: true, articleCategory: deleted }
}