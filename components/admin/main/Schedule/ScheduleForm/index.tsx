"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    createTrainingSchedule,
    updateTrainingSchedule,
    publishTrainingSchedule,
    cancelTrainingSchedule,
} from "@/lib/data/training/trainingSchedule/trainingScheduleAction";
import { ScheduleFormHeader } from "../Form/ScheduleFormHeader";
import { TrainingSchedule } from "@/types";
import { TrainingScheduleType } from "@/lib/generated/prisma/enums";

type TrainingOption = { id: string; title: string };

interface ScheduleFormProps {
    trainings: TrainingOption[];
    initialData?: TrainingSchedule | null;
    scheduleId?: string;
}

/** input[type=datetime-local] butuh "YYYY-MM-DDTHH:mm" di timezone lokal, bukan ISO UTC */
const toLocalInputValue = (value?: Date | string | null) => {
    if (!value) return "";
    const d = new Date(value);
    const offset = d.getTimezoneOffset();
    const local = new Date(d.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16);
};

const ScheduleForm = ({ trainings, initialData, scheduleId }: ScheduleFormProps) => {
    const router = useRouter();
    const isEditing = Boolean(scheduleId);

    const [fields, setFields] = useState({
        trainingId: initialData?.trainingId || trainings[0]?.id || "",
        type: (initialData?.type as TrainingScheduleType) || "PUBLIC",
        startAt: toLocalInputValue(initialData?.startAt),
        endAt: toLocalInputValue(initialData?.endAt),
        location: initialData?.location || "",
        price: initialData ? String(initialData.price) : "",
        quota: initialData?.quota ? String(initialData.quota) : "",
        batch: initialData?.batch ? String(initialData.batch) : "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);

    const updateField = (patch: Partial<typeof fields>) => {
        setFields((f) => ({ ...f, ...patch }));
    };

    const validate = (): string | null => {
        if (!fields.trainingId) return "Training induk harus dipilih";
        if (!fields.startAt || !fields.endAt) return "Tanggal mulai dan selesai harus diisi";
        if (new Date(fields.endAt) <= new Date(fields.startAt)) return "Tanggal selesai harus setelah tanggal mulai";
        if (!fields.quota || Number(fields.quota) <= 0) return "Kuota harus lebih dari 0";
        if (fields.price === "" || Number(fields.price) < 0) return "Harga tidak boleh kosong/negatif";
        if (!fields.batch || Number(fields.batch) <= 0) return "Nomor batch harus lebih dari 0";
        return null;
    };

    const handleSubmit = async () => {
        const error = validate();
        if (error) {
            alert(error);
            return;
        }

        try {
            setIsSubmitting(true);

            const payload = {
                trainingId: fields.trainingId,
                type: fields.type,
                startAt: new Date(fields.startAt),
                endAt: new Date(fields.endAt),
                location: fields.location || undefined,
                price: Number(fields.price),
                quota: Number(fields.quota),
                batch: Number(fields.batch),
            };

            if (isEditing && scheduleId) {
                await updateTrainingSchedule(scheduleId, payload);
            } else {
                await createTrainingSchedule(payload);
            }

            router.push("/admin/training/jadwal");
            router.refresh();
        } catch (err) {
            console.error("Submit error:", err);
            alert(err instanceof Error ? err.message : "Gagal menyimpan jadwal.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePublish = async () => {
        if (!scheduleId) return;
        if (!confirm("Publikasikan jadwal ini? Status akan berubah dari Draf menjadi Terbuka dan mulai bisa didaftari publik.")) return;

        try {
            setIsPublishing(true);
            await publishTrainingSchedule(scheduleId);
            router.push("/admin/training/jadwal");
            router.refresh();
        } catch (err) {
            console.error("Publish error:", err);
            alert(err instanceof Error ? err.message : "Gagal mempublikasikan jadwal.");
        } finally {
            setIsPublishing(false);
        }
    };

    const handleCancel = async () => {
        const reason = prompt("Alasan pembatalan (opsional, akan dikirim ke pendaftar yang masih Pending):");
        if (reason === null) return; // user klik Cancel di prompt, bukan submit alasan kosong
        if (!scheduleId) return;
        if (!confirm("Yakin batalkan jadwal ini? Pendaftar berstatus Pending otomatis akan ditolak.")) return;

        try {
            setIsCancelling(true);
            await cancelTrainingSchedule(scheduleId, reason || undefined);
            router.push("/admin/training/jadwal");
            router.refresh();
        } catch (err) {
            console.error("Cancel error:", err);
            alert(err instanceof Error ? err.message : "Gagal membatalkan jadwal.");
        } finally {
            setIsCancelling(false);
        }
    };

    return (
        <div className="space-y-6 max-w-6xl mx-auto pb-16">
            <ScheduleFormHeader
                isEditing={isEditing}
                currentStatus={initialData?.status}
                isSubmitting={isSubmitting}
                isPublishing={isPublishing}
                isCancelling={isCancelling}
                onSubmit={handleSubmit}
                onPublish={handlePublish}
                onCancel={handleCancel}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* KONTEN — 8 kolom */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Training induk & tipe */}
                    <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-4">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                Training Induk <span className="text-red-500">*</span>
                            </label>
                            {trainings.length > 0 ? (
                                <select
                                    value={fields.trainingId}
                                    onChange={(e) => updateField({ trainingId: e.target.value })}
                                    disabled={isEditing}
                                    className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white disabled:opacity-60"
                                >
                                    {trainings.map((t) => (
                                        <option key={t.id} value={t.id}>
                                            {t.title}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p className="text-xs text-amber-600 dark:text-amber-400">
                                    Belum ada data training. Buat training terlebih dahulu.
                                </p>
                            )}
                            {isEditing && (
                                <p className="text-[11px] text-gray-400 mt-1">
                                    Training induk tidak bisa diubah setelah jadwal dibuat.
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                Tipe Training <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {(["PUBLIC", "INHOUSE"] as const).map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => updateField({ type })}
                                        className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${fields.type === type
                                                ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950/40 dark:text-brand-400"
                                                : "border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                                            }`}
                                    >
                                        {type === "PUBLIC" ? "Publik" : "Inhouse"}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tanggal */}
                    <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Jadwal Pelaksanaan</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                    Mulai <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    value={fields.startAt}
                                    onChange={(e) => updateField({ startAt: e.target.value })}
                                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                    Selesai <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    value={fields.endAt}
                                    onChange={(e) => updateField({ endAt: e.target.value })}
                                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                />
                            </div>
                        </div>
                        <p className="text-[11px] text-gray-400">
                            Pendaftaran otomatis ditutup 3 hari sebelum tanggal mulai — tidak perlu diatur manual.
                        </p>
                    </div>

                    {/* Lokasi */}
                    <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-3">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            Lokasi
                        </label>
                        <input
                            type="text"
                            value={fields.location}
                            onChange={(e) => updateField({ location: e.target.value })}
                            placeholder="Contoh: Jakarta Training Center, atau link Zoom"
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />
                    </div>
                </div>

                {/* SIDEBAR — 4 kolom */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-3">
                            Kuota &amp; Harga
                        </h3>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                Kuota Peserta <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                min={1}
                                value={fields.quota}
                                onChange={(e) => updateField({ quota: e.target.value })}
                                placeholder="30"
                                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />
                            {isEditing && initialData?.approvedCount !== undefined && (
                                <p className="text-[11px] text-gray-400 mt-1">
                                    Terisi saat ini: {initialData.approvedCount} peserta (approved)
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                Harga (Rp) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                min={0}
                                step="1000"
                                value={fields.price}
                                onChange={(e) => updateField({ price: e.target.value })}
                                placeholder="0"
                                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                                Nomor Batch <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                min={1}
                                value={fields.batch}
                                onChange={(e) => updateField({ batch: e.target.value })}
                                placeholder="1"
                                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />
                        </div>
                    </div>

                    {isEditing && initialData && (
                        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-3">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-3">
                                Informasi
                            </h3>
                            <div className="space-y-2.5 text-sm">
                                {initialData.createdAt && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">Dibuat:</span>
                                        <span className="text-gray-700 dark:text-gray-300 text-xs">
                                            {new Date(initialData.createdAt).toLocaleDateString("id-ID", {
                                                day: "numeric", month: "short", year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                )}
                                {initialData.updatedAt && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">Diubah:</span>
                                        <span className="text-gray-700 dark:text-gray-300 text-xs">
                                            {new Date(initialData.updatedAt).toLocaleDateString("id-ID", {
                                                day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
                                            })}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ScheduleForm;