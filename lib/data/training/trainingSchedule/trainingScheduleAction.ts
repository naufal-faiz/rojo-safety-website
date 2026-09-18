"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { CreateTrainingScheduleInput, UpdateTrainingScheduleInput } from "@/types";

// FULL & COMPLETED sengaja tidak ada di enum TrainingScheduleStatus sama sekali —
// keduanya murni computed, lihat lib/utils/scheduleStatus.ts. Karena itu sudah
// dijamin di level tipe (UpdateTrainingScheduleInput["status"] cuma bisa
// DRAFT/OPEN/CLOSED/CANCELLED), tidak perlu lagi guard manual di runtime.

export async function createTrainingSchedule(input: CreateTrainingScheduleInput) {
    try {
        if (!input.trainingId) throw new Error("Training induk harus dipilih");
        if (input.endAt <= input.startAt) throw new Error("Tanggal selesai harus setelah tanggal mulai");
        if (input.quota <= 0) throw new Error("Kuota harus lebih dari 0");
        if (input.price < 0) throw new Error("Harga tidak boleh negatif");
        if (input.batch <= 0) throw new Error("Nomor batch harus lebih dari 0");

        const training = await prisma.training.findUnique({ where: { id: input.trainingId, deletedAt: null } });
        if (!training) throw new Error("Training induk tidak ditemukan");

        const created = await prisma.trainingSchedule.create({
            data: {
                trainingId: input.trainingId,
                type: input.type,
                startAt: input.startAt,
                endAt: input.endAt,
                location: input.location,
                price: input.price,
                quota: input.quota,
                batch: input.batch,
                status: "DRAFT" // selalu mulai dari draft, publish manual terpisah
            }
        });

        revalidatePath("/admin/training/jadwal");
        return { success: true, id: created.id };
    } catch (err) {
        console.error("Error creating training schedule:", err);
        throw err;
    }
}

export async function updateTrainingSchedule(id: string, input: UpdateTrainingScheduleInput) {
    try {
        const schedule = await prisma.trainingSchedule.findUnique({ where: { id, deletedAt: null } });
        if (!schedule) throw new Error("Jadwal tidak ditemukan");

        const nextStartAt = input.startAt ?? schedule.startAt;
        const nextEndAt = input.endAt ?? schedule.endAt;
        if (nextEndAt <= nextStartAt) throw new Error("Tanggal selesai harus setelah tanggal mulai");

        const updated = await prisma.trainingSchedule.update({
            where: { id },
            data: {
                ...(input.type !== undefined && { type: input.type }),
                ...(input.startAt !== undefined && { startAt: input.startAt }),
                ...(input.endAt !== undefined && { endAt: input.endAt }),
                ...(input.location !== undefined && { location: input.location }),
                ...(input.price !== undefined && { price: input.price }),
                ...(input.quota !== undefined && { quota: input.quota }),
                ...(input.batch !== undefined && { batch: input.batch }),
                ...(input.status !== undefined && { status: input.status }),
            }
        });

        revalidatePath("/admin/training/jadwal");
        return { success: true, id: updated.id };
    } catch (err) {
        console.error("Error updating training schedule:", err);
        throw err;
    }
}

/** Shortcut publish: DRAFT -> OPEN. Terpisah dari updateTrainingSchedule biar action-nya eksplisit di UI (1 tombol "Publikasikan"). */
export async function publishTrainingSchedule(id: string) {
    try {
        const schedule = await prisma.trainingSchedule.findUnique({ where: { id, deletedAt: null } });
        if (!schedule) throw new Error("Jadwal tidak ditemukan");
        if (schedule.status !== "DRAFT") throw new Error("Hanya jadwal berstatus draf yang bisa dipublikasikan");

        await prisma.trainingSchedule.update({ where: { id }, data: { status: "OPEN" } });
        revalidatePath("/admin/training/jadwal");
        return { success: true };
    } catch (err) {
        console.error("Error publishing schedule:", err);
        throw err;
    }
}

export async function cancelTrainingSchedule(id: string, reason?: string) {
    try {
        const schedule = await prisma.trainingSchedule.findUnique({ where: { id, deletedAt: null } });
        if (!schedule) throw new Error("Jadwal tidak ditemukan");
        if (new Date() >= schedule.endAt) throw new Error("Jadwal yang sudah selesai tidak bisa dibatalkan");

        await prisma.trainingSchedule.update({ where: { id }, data: { status: "CANCELLED" } });

        // Opsional tapi disarankan: tandai semua pendaftar PENDING jadi REJECTED otomatis
        await prisma.trainingRegistration.updateMany({
            where: { trainingScheduleId: id, status: "PENDING" },
            data: {
                status: "REJECTED",
                rejectionReason: reason ?? "Jadwal training dibatalkan",
                reviewedAt: new Date()
            }
        });

        revalidatePath("/admin/training/jadwal");
        return { success: true };
    } catch (err) {
        console.error("Error cancelling schedule:", err);
        throw err;
    }
}

export async function softDeleteTrainingSchedule(id: string) {
    try {
        await prisma.trainingSchedule.update({ where: { id }, data: { deletedAt: new Date() } });
        revalidatePath("/admin/training/jadwal");
        return { success: true };
    } catch (err) {
        console.error("Error deleting schedule:", err);
        throw err;
    }
}