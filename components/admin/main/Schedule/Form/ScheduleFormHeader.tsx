"use client";

import Link from "next/link";
import { TrainingScheduleStatus } from "@/lib/generated/prisma/enums";

interface ScheduleFormHeaderProps {
    isEditing: boolean;
    currentStatus?: TrainingScheduleStatus;
    isSubmitting: boolean;
    isPublishing: boolean;
    isCancelling: boolean;
    onSubmit: () => void;
    onPublish: () => void;
    onCancel: () => void;
}

export const ScheduleFormHeader = ({
    isEditing,
    currentStatus,
    isSubmitting,
    isPublishing,
    isCancelling,
    onSubmit,
    onPublish,
    onCancel,
}: ScheduleFormHeaderProps) => {
    const canPublish = isEditing && currentStatus === "DRAFT";
    const canCancel = isEditing && currentStatus !== "CANCELLED";

    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-white dark:bg-gray-900 p-4 sm:p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
            <div className="flex items-center gap-3">
                <Link
                    href="/admin/training/jadwal"
                    className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors shrink-0"
                    title="Kembali ke Daftar Jadwal"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </Link>
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                            {isEditing ? "Edit Jadwal Training" : "Buat Jadwal Training Baru"}
                        </h1>
                        {isEditing && currentStatus && (
                            <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold uppercase tracking-wide ${
                                    currentStatus === "OPEN"
                                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                        : currentStatus === "CANCELLED"
                                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                        : currentStatus === "CLOSED"
                                        ? "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                }`}
                            >
                                {currentStatus}
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {isEditing
                            ? "Perbarui detail jadwal — status FULL/COMPLETED dihitung otomatis"
                            : "Isi detail penyelenggaraan training baru (mulai dari status Draf)"}
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
                <Link
                    href="/admin/training/jadwal"
                    className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                    Kembali
                </Link>

                {canCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isCancelling}
                        className="rounded-xl border border-red-300 dark:border-red-800 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors disabled:opacity-50"
                    >
                        {isCancelling ? "Membatalkan..." : "Batalkan Jadwal"}
                    </button>
                )}

                {canPublish && (
                    <button
                        type="button"
                        onClick={onPublish}
                        disabled={isPublishing}
                        className="rounded-xl bg-green-600 hover:bg-green-700 px-4 py-2 text-sm font-medium text-white shadow-xs transition-colors disabled:opacity-60"
                    >
                        {isPublishing ? "Mempublikasikan..." : "Publikasikan"}
                    </button>
                )}

                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    className="rounded-xl bg-brand-500 hover:bg-brand-600 px-5 py-2 text-sm font-medium text-white shadow-xs transition-colors flex items-center gap-2 disabled:opacity-60"
                >
                    {isSubmitting && (
                        <span className="animate-spin size-3.5 border-2 border-white border-t-transparent rounded-full" />
                    )}
                    <span>{isEditing ? "Simpan Perubahan" : "Buat Jadwal"}</span>
                </button>
            </div>
        </div>
    );
};