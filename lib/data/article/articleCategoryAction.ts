"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createArticleCategory(
    name: string
) {
    const cleanName = name.trim();

    if (!cleanName) {
        return {
            success: false,
            message: "Nama kategori wajib diisi.",
        };
    }

    try {
        const existingCategory =
            await prisma.articleCategory.findFirst({
                where: {
                    name: {
                        equals: cleanName,
                        mode: "insensitive",
                    },
                    deletedAt: null,
                },
            });

        if (existingCategory) {
            return {
                success: false,
                message: "Kategori sudah tersedia.",
            };
        }

        await prisma.articleCategory.create({
            data: {
                name: cleanName,
            },
        });

        revalidatePath(
            "/admin/artikel/kategori-artikel"
        );

        return {
            success: true,
            message: "Kategori berhasil dibuat.",
        };
    } catch (error) {
        console.error(
            "Failed to create article category:",
            error
        );

        return {
            success: false,
            message: "Gagal membuat kategori.",
        };
    }
}

export async function updateArticleCategory(
    id: string,
    name: string
) {
    const cleanName = name.trim();

    if (!cleanName) {
        return {
            success: false,
            message: "Nama kategori wajib diisi.",
        };
    }

    try {
        const existingCategory =
            await prisma.articleCategory.findFirst({
                where: {
                    name: {
                        equals: cleanName,
                        mode: "insensitive",
                    },
                    deletedAt: null,
                    NOT: {
                        id,
                    },
                },
            });

        if (existingCategory) {
            return {
                success: false,
                message: "Kategori sudah tersedia.",
            };
        }

        await prisma.articleCategory.update({
            where: {
                id,
            },
            data: {
                name: cleanName,
            },
        });

        revalidatePath(
            "/admin/artikel/kategori-artikel"
        );

        return {
            success: true,
            message: "Kategori berhasil diperbarui.",
        };
    } catch (error) {
        console.error(
            "Failed to update article category:",
            error
        );

        return {
            success: false,
            message: "Gagal memperbarui kategori.",
        };
    }
}

export async function softDeleteArticleCategory(
    id: string
) {
    try {
        await prisma.articleCategory.update({
            where: {
                id,
            },
            data: {
                deletedAt: new Date(),
            },
        });

        revalidatePath(
            "/admin/artikel/kategori-artikel"
        );

        return {
            success: true,
            message: "Kategori berhasil dihapus.",
        };
    } catch (error) {
        console.error(
            "Failed to delete article category:",
            error
        );

        return {
            success: false,
            message: "Gagal menghapus kategori.",
        };
    }
}