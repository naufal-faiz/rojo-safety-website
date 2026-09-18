"use client";

import Link from "next/link";

interface HeavyEquipmentFormHeaderProps {
    isEditing: boolean;
    isSubmitting: boolean;
    onSubmit: () => void;
}

export const HeavyEquipmentFormHeader = ({
    isEditing,
    isSubmitting,
    onSubmit,
}: HeavyEquipmentFormHeaderProps) => {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white dark:bg-gray-900 p-4 sm:p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
            <div className="flex items-center gap-3">
                <Link
                    href="/admin/training/jenis-alat"
                    className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                    title="Kembali ke Daftar Alat Berat"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                </Link>
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                        {isEditing ? "Edit Alat Berat" : "Buat Alat Berat Baru"}
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {isEditing
                            ? "Perbarui detail alat berat"
                            : "Tambahkan alat berat baru ke dalam sistem"}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Link
                    href="/admin/training/jenis-alat"
                    className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                    Batal
                </Link>
                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    className="rounded-xl bg-brand-500 hover:bg-brand-600 px-5 py-2 text-sm font-medium text-white shadow-xs transition-colors flex items-center gap-2 disabled:opacity-60"
                >
                    {isSubmitting && (
                        <span className="animate-spin size-3.5 border-2 border-white border-t-transparent rounded-full" />
                    )}
                    <span>{isEditing ? "Simpan" : "Buat Alat Berat"}</span>
                </button>
            </div>
        </div>
    );
};
