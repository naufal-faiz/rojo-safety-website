"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTrainingCategory(name: string) {
    if (!name.trim()) {
        throw new Error("Nama kategori tidak boleh kosong!");
    }

    const created = await prisma.trainingCategory.create({
        data: {
            name: name.trim(),
            slug: name.trim().toLowerCase().replace(/\s+/g, "-"),
        },
    });

    revalidatePath("/admin/training/kategori-training");

    return created;
}

export async function updateTrainingCategory(
    id: string,
    name: string
) {
    if (!name.trim()) {
        throw new Error("Nama kategori tidak boleh kosong!");
    }

    const updated = await prisma.trainingCategory.update({
        where: { id },
        data: {
            name: name.trim(),
            slug: name.trim().toLowerCase().replace(/\s+/g, "-"),
        },
    });

    revalidatePath("/admin/training/kategori-training");

    return updated;
}

export async function softDeleteTrainingCategory(id: string) {
    const deleted = await prisma.trainingCategory.update({
        where: { id },
        data: {
            deletedAt: new Date(),
        },
    });

    revalidatePath("/admin/training/kategori-training");

    return {
        success: true,
        trainingCategory: deleted,
    };
}