import { TrainingScheduleStatus } from "@/lib/generated/prisma/enums";

/** Hari sebelum startAt di mana pendaftaran otomatis dianggap tutup */
export const REGISTRATION_CLOSE_BEFORE_DAYS = 3;

/**
 * Status tampilan schedule. Superset dari `TrainingScheduleStatus` (kolom DB) —
 * "FULL" dan "COMPLETED" TIDAK PERNAH ada di kolom DB (enum-nya sekarang cuma
 * DRAFT/OPEN/CLOSED/CANCELLED), keduanya murni hasil hitungan di sini.
 */
export type ScheduleDisplayStatus = TrainingScheduleStatus | "FULL" | "COMPLETED";

export type DerivedTimeStatus = "UPCOMING" | "ONGOING" | "COMPLETED";

export type ScheduleForStatus = {
    status: TrainingScheduleStatus; // nilai mentah dari DB (niat admin)
    startAt: Date;
    endAt: Date;
    quota: number;
};

/**
 * Status "resmi" untuk ditampilkan ke user — menggabungkan niat admin (status di DB)
 * dengan realita waktu & quota. TIDAK PERNAH ditulis balik ke DB.
 *
 * Prioritas (paling menang di atas):
 *  1. CANCELLED (keputusan admin, final)
 *  2. COMPLETED (endAt sudah lewat — fakta waktu, tidak bisa dibantah niat admin)
 *  3. CLOSED (niat admin eksplisit ATAU otomatis: quota penuh / H-3 sebelum mulai)
 *  4. DRAFT (belum dipublish admin)
 *  5. OPEN (default kalau tidak kena kondisi di atas)
 */
export function computeScheduleStatus(
    schedule: ScheduleForStatus,
    approvedCount: number,
    now: Date = new Date()
): ScheduleDisplayStatus {
    if (schedule.status === "CANCELLED") return "CANCELLED";
    if (now >= schedule.endAt) return "COMPLETED";
    if (schedule.status === "DRAFT") return "DRAFT";
    if (schedule.status === "CLOSED") return "CLOSED";

    const closingDate = new Date(schedule.startAt);
    closingDate.setDate(closingDate.getDate() - REGISTRATION_CLOSE_BEFORE_DAYS);
    if (now >= closingDate) return "CLOSED"; // H-3 otomatis

    if (approvedCount >= schedule.quota) return "FULL";

    return "OPEN";
}

/** Status berbasis waktu murni — buat badge "Akan Datang / Berlangsung / Selesai" */
export function computeDerivedTimeStatus(
    schedule: Pick<ScheduleForStatus, "startAt" | "endAt">,
    now: Date = new Date()
): DerivedTimeStatus {
    if (now >= schedule.endAt) return "COMPLETED";
    if (now >= schedule.startAt) return "ONGOING";
    return "UPCOMING";
}

/** Dipakai server action sebelum insert TrainingRegistration */
export function canRegister(
    schedule: ScheduleForStatus,
    approvedCount: number,
    now: Date = new Date()
): { allowed: boolean; reason?: string } {
    const status = computeScheduleStatus(schedule, approvedCount, now);

    if (status === "CANCELLED") return { allowed: false, reason: "Jadwal ini telah dibatalkan." };
    if (status === "COMPLETED") return { allowed: false, reason: "Training ini telah selesai." };
    if (status === "CLOSED") return { allowed: false, reason: "Pendaftaran untuk jadwal ini telah ditutup." };
    if (status === "FULL") return { allowed: false, reason: "Kuota peserta untuk jadwal ini sudah penuh." };
    if (status === "DRAFT") return { allowed: false, reason: "Jadwal ini belum dibuka untuk umum." };

    return { allowed: true };
}