"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { CreateRegistrationInput } from "@/types";
import { canRegister } from "@/lib/utils/trainingScheduleStatus";

/**
 * PUBLIC: submit formulir pendaftaran (status selalu PENDING, tidak
 * menyentuh quota sama sekali — jadi aman dari race condition tanpa
 * perlu lock apapun di sini).
 */
export async function submitTrainingRegistration(input: CreateRegistrationInput) {
    try {
        if (!input.name.trim()) throw new Error("Nama tidak boleh kosong");
        if (!input.email.trim()) throw new Error("Email tidak boleh kosong");

        const schedule = await prisma.trainingSchedule.findUnique({
            where: { id: input.trainingScheduleId, deletedAt: null }
        });
        if (!schedule) throw new Error("Jadwal training tidak ditemukan");

        const approvedCount = await prisma.trainingRegistration.count({
            where: { trainingScheduleId: schedule.id, status: "APPROVED", deletedAt: null }
        });

        const check = canRegister(schedule, approvedCount);
        if (!check.allowed) throw new Error(check.reason);

        const created = await prisma.trainingRegistration.create({
            data: {
                trainingScheduleId: input.trainingScheduleId,
                name: input.name.trim(),
                email: input.email.trim().toLowerCase(),
                phone: input.phone,
                company: input.company,
                notes: input.notes,
                status: "PENDING"
            }
        });

        revalidatePath("/admin/training/pendaftaran");
        return { success: true, id: created.id };
    } catch (err) {
        // Unique constraint (trainingScheduleId + email) -> sudah pernah daftar.
        // Duck-typed (bukan `instanceof Prisma.PrismaClientKnownRequestError`) karena
        // provider generator "prisma-client" (Prisma 7) punya lokasi export error class
        // yang bisa beda dari classic @prisma/client — cek berdasar `code` saja lebih aman.
        if (typeof err === "object" && err !== null && "code" in err && (err as { code?: string }).code === "P2002") {
            throw new Error("Email ini sudah terdaftar untuk jadwal training ini.");
        }
        console.error("Error submitting registration:", err);
        throw err;
    }
}

/**
 * ADMIN: approve satu pendaftaran.
 *
 * INI TITIK RAWAN RACE CONDITION: dua admin approve dua pendaftar berbeda
 * bersamaan saat sisa 1 kuota. Diselesaikan dengan row-lock (`FOR UPDATE`)
 * di baris TrainingSchedule dalam satu transaction — approval kedua yang
 * datang akan menunggu approval pertama commit dulu, baru hitung ulang
 * quota dengan angka yang sudah ter-update. Jadi tidak mungkin overbooking.
 */
export async function approveRegistration(registrationId: string, adminId?: string) {
    try {
        const result = await prisma.$transaction(async (tx) => {
            const registration = await tx.trainingRegistration.findUnique({
                where: { id: registrationId, deletedAt: null }
            });
            if (!registration) throw new Error("Pendaftaran tidak ditemukan");
            if (registration.status !== "PENDING") {
                throw new Error(`Pendaftaran ini sudah berstatus ${registration.status}, tidak bisa diproses ulang.`);
            }

            // Row-lock schedule -> approval konkuren untuk schedule yang sama akan antre di sini
            const lockedSchedule = await tx.$queryRaw<
                { id: string; quota: number; status: string; startAt: Date; endAt: Date }[]
            >`SELECT id, quota, status, start_at as "startAt", end_at as "endAt"
              FROM training_schedule
              WHERE id = ${registration.trainingScheduleId}
              FOR UPDATE`;

            const schedule = lockedSchedule[0];
            if (!schedule) throw new Error("Jadwal training tidak ditemukan");
            if (schedule.status === "CANCELLED") throw new Error("Jadwal ini sudah dibatalkan.");

            const approvedCount = await tx.trainingRegistration.count({
                where: { trainingScheduleId: schedule.id, status: "APPROVED", deletedAt: null }
            });
            if (approvedCount >= schedule.quota) {
                throw new Error("Kuota untuk jadwal ini sudah penuh — tidak bisa approve lagi.");
            }

            const updated = await tx.trainingRegistration.update({
                where: { id: registrationId },
                data: {
                    status: "APPROVED",
                    reviewedAt: new Date(),
                    reviewedBy: adminId ?? null,
                    rejectionReason: null
                }
            });

            return updated;
        });

        revalidatePath("/admin/training/pendaftaran");
        return { success: true, id: result.id };
    } catch (err) {
        console.error("Error approving registration:", err);
        throw err;
    }
}

export async function rejectRegistration(registrationId: string, reason: string, adminId?: string) {
    try {
        const registration = await prisma.trainingRegistration.findUnique({
            where: { id: registrationId, deletedAt: null }
        });
        if (!registration) throw new Error("Pendaftaran tidak ditemukan");
        if (registration.status !== "PENDING") {
            throw new Error(`Pendaftaran ini sudah berstatus ${registration.status}, tidak bisa diproses ulang.`);
        }

        await prisma.trainingRegistration.update({
            where: { id: registrationId },
            data: {
                status: "REJECTED",
                rejectionReason: reason,
                reviewedAt: new Date(),
                reviewedBy: adminId ?? null
            }
        });

        revalidatePath("/admin/training/pendaftaran");
        return { success: true };
    } catch (err) {
        console.error("Error rejecting registration:", err);
        throw err;
    }
}

/** Batalkan approval yang sudah terlanjur diberikan (mengembalikan slot quota) */
export async function revertApprovedRegistration(registrationId: string, reason: string, adminId?: string) {
    try {
        const registration = await prisma.trainingRegistration.findUnique({
            where: { id: registrationId, deletedAt: null }
        });
        if (!registration) throw new Error("Pendaftaran tidak ditemukan");
        if (registration.status !== "APPROVED") throw new Error("Hanya pendaftaran APPROVED yang bisa dibatalkan statusnya.");

        await prisma.trainingRegistration.update({
            where: { id: registrationId },
            data: { status: "REJECTED", rejectionReason: reason, reviewedAt: new Date(), reviewedBy: adminId ?? null }
        });

        revalidatePath("/admin/training/pendaftaran");
        return { success: true };
    } catch (err) {
        console.error("Error reverting registration:", err);
        throw err;
    }
}

export async function softDeleteRegistration(id: string) {
    try {
        await prisma.trainingRegistration.update({ where: { id }, data: { deletedAt: new Date() } });
        revalidatePath("/admin/training/pendaftaran");
        return { success: true };
    } catch (err) {
        console.error("Error deleting registration:", err);
        throw err;
    }
}