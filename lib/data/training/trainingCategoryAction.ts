"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type CategoryActionResult = {
    success: boolean;
    message: string;
};

const slugify = (value: string) => {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
};

export async function createTrainingCategory(
    name: string
): Promise<CategoryActionResult> {
    try {
        const trimmedName = name.trim();

        if (!trimmedName) {
            return {
                success: false,
                message:
                    "Nama kategori tidak boleh kosong.",
            };
        }

        const slug = slugify(trimmedName);

        const existing =
            await prisma.trainingCategory.findFirst({
                where: {
                    OR: [
                        {
                            name: trimmedName,
                            deletedAt: null,
                        },
                        {
                            slug,
                            deletedAt: null,
                        },
                    ],
                },
            });

        if (existing) {
            return {
                success: false,
                message:
                    "Kategori dengan nama tersebut sudah ada.",
            };
        }

        await prisma.trainingCategory.create({
            data: {
                name: trimmedName,
                slug,
            },
        });

        revalidatePath(
            "/admin/training/kategori-training"
        );

        return {
            success: true,
            message:
                "Kategori training berhasil dibuat.",
        };
    } catch (error) {
        console.error(
            "Failed to create training category:",
            error
        );

        return {
            success: false,
            message:
                "Gagal membuat kategori training.",
        };
    }
}

export async function updateTrainingCategory(
    id: string,
    name: string
): Promise<CategoryActionResult> {
    try {
        const trimmedName = name.trim();

        if (!trimmedName) {
            return {
                success: false,
                message:
                    "Nama kategori tidak boleh kosong.",
            };
        }

        const slug = slugify(trimmedName);

        const existing =
            await prisma.trainingCategory.findFirst({
                where: {
                    OR: [
                        {
                            name: trimmedName,
                            deletedAt: null,
                        },
                        {
                            slug,
                            deletedAt: null,
                        },
                    ],
                    NOT: {
                        id,
                    },
                },
            });

        if (existing) {
            return {
                success: false,
                message:
                    "Kategori dengan nama tersebut sudah ada.",
            };
        }

        await prisma.trainingCategory.update({
            where: {
                id,
            },
            data: {
                name: trimmedName,
                slug,
            },
        });

        revalidatePath(
            "/admin/training/kategori-training"
        );

        return {
            success: true,
            message:
                "Kategori training berhasil diperbarui.",
        };
    } catch (error) {
        console.error(
            "Failed to update training category:",
            error
        );

        return {
            success: false,
            message:
                "Gagal memperbarui kategori training.",
        };
    }
}

export async function softDeleteTrainingCategory(
    id: string
): Promise<CategoryActionResult> {
    try {
        await prisma.trainingCategory.update({
            where: {
                id,
            },
            data: {
                deletedAt: new Date(),
            },
        });

        revalidatePath(
            "/admin/training/kategori-training"
        );

        return {
            success: true,
            message:
                "Kategori training berhasil dihapus.",
        };
    } catch (error) {
        console.error(
            "Failed to delete training category:",
            error
        );

        return {
            success: false,
            message:
                "Gagal menghapus kategori training.",
        };
    }
}