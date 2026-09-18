"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { CreateHeavyEquipmentInput } from "@/types";

export async function createHeavyEquipment(input: CreateHeavyEquipmentInput) {
    try {
        if (!input.name.trim()) {
            throw new Error("Nama alat tidak boleh kosong");
        }
        if (!input.description.trim()) {
            throw new Error("Deskripsi tidak boleh kosong");
        }
        if (!input.image.trim()) {
            throw new Error("Foto alat harus diunggah");
        }
        if (!input.trainingCategoryId) {
            throw new Error("Kategori harus dipilih");
        }

        // Validasi kategori exists
        const category = await prisma.trainingCategory.findUnique({
            where: { id: input.trainingCategoryId, deletedAt: null }
        });
        if (!category) {
            throw new Error("Kategori tidak valid atau telah dihapus");
        }

        const created = await prisma.heavyEquipment.create({
            data: {
                name: input.name.trim(),
                description: input.description.trim(),
                image: input.image,
                trainingCategoryId: input.trainingCategoryId
            },
            include: { category: true }
        });

        revalidatePath("/admin/training/jenis-alat");
        return { success: true, id: created.id, data: created };
    } catch (err) {
        console.error("Error creating heavy equipment:", err);
        throw err;
    }
}

export async function updateHeavyEquipment(id: string, input: Partial<CreateHeavyEquipmentInput>) {
    try {
        if (input.name !== undefined && !input.name.trim()) {
            throw new Error("Nama alat tidak boleh kosong");
        }
        if (input.description !== undefined && !input.description.trim()) {
            throw new Error("Deskripsi tidak boleh kosong");
        }

        const equipment = await prisma.heavyEquipment.findUnique({
            where: { id, deletedAt: null }
        });
        if (!equipment) {
            throw new Error("Alat tidak ditemukan");
        }

        if (input.trainingCategoryId) {
            const category = await prisma.trainingCategory.findUnique({
                where: { id: input.trainingCategoryId, deletedAt: null }
            });
            if (!category) {
                throw new Error("Kategori tidak valid");
            }
        }

        const updated = await prisma.heavyEquipment.update({
            where: { id },
            data: {
                ...(input.name !== undefined && { name: input.name.trim() }),
                ...(input.description !== undefined && { description: input.description.trim() }),
                ...(input.image !== undefined && { image: input.image }),
                ...(input.trainingCategoryId !== undefined && { trainingCategoryId: input.trainingCategoryId })
            },
            include: { category: true }
        });

        revalidatePath("/admin/training/jenis-alat");
        return { success: true, id: updated.id, data: updated };
    } catch (err) {
        console.error("Error updating heavy equipment:", err);
        throw err;
    }
}

export async function softDeleteHeavyEquipment(id: string) {
    try {
        const equipment = await prisma.heavyEquipment.findUnique({
            where: { id }
        });
        if (!equipment) {
            throw new Error("Alat tidak ditemukan");
        }

        await prisma.heavyEquipment.update({
            where: { id },
            data: { deletedAt: new Date() }
        });

        revalidatePath("/admin/training/jenis-alat");
        return { success: true };
    } catch (err) {
        console.error("Error soft deleting heavy equipment:", err);
        throw err;
    }
}

export async function deleteHeavyEquipment(id: string) {
    try {
        await prisma.heavyEquipment.delete({
            where: { id }
        });
        revalidatePath("/admin/training/jenis-alat");
        return { success: true };
    } catch (err) {
        console.error("Error deleting heavy equipment:", err);
        throw err;
    }
}
