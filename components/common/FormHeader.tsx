"use client";

import Link from "next/link";
import { PublishedStatus } from "@/lib/generated/prisma/enums";
import { AutosaveStatus } from "@/hooks/usePublishableForm";

interface FormHeaderProps {
    title: string
    isExisting: boolean;
    subtitleEdit: string
    subtitleCreate: string
    publishedStatus: PublishedStatus;
    autosaveStatus: AutosaveStatus;
    isPublishing: boolean;
    isPublished: boolean;
    hasUnsavedChanges: boolean;
    onSaveDraft: () => void;
    onSaveChanges: () => void;
    onPublish: () => void;
}

export const FormHeader = ({
    title,
    isExisting,
    subtitleEdit,
    subtitleCreate,
    publishedStatus,
    autosaveStatus,
    isPublishing,
    isPublished,
    hasUnsavedChanges,
    onSaveDraft,
    onSaveChanges,
    onPublish,
}: FormHeaderProps) => {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white dark:bg-gray-900 p-4 sm:p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
            <div className="flex items-center gap-3">
                <Link
                    href={`/admin/${title.toLocaleLowerCase()}`}
                    className="flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 hover:border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                    title={`Kembali ke Daftar ${title}`}
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </Link>
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                            {isExisting ?`Edit ${title}` : `Buat ${title} Baru`}
                        </h1>
                        <span
                            className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${publishedStatus === "PUBLISHED"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                }`}
                        >
                            {publishedStatus === "PUBLISHED" ? "Dipublikasikan" : "Draf"}
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {isExisting
                            ? subtitleEdit
                            : subtitleCreate}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mr-1">
                    {isPublished ? (
                        hasUnsavedChanges ? (
                            <>
                                <span className="size-2 rounded-full bg-amber-500" />
                                <span className="text-amber-600 dark:text-amber-400">
                                    Ada perubahan belum disimpan
                                </span>
                            </>
                        ) : (
                            autosaveStatus === "saving" ? (
                                <>
                                    <span className="animate-spin size-3 border-2 border-brand-500 border-t-transparent rounded-full" />
                                    <span>Menyimpan...</span>
                                </>
                            ) : (
                                <>
                                    <span className="size-2 rounded-full bg-green-500" />
                                    <span>Tersimpan</span>
                                </>
                            )
                        )
                    ) : (
                        <>
                            {autosaveStatus === "saving" && (
                                <>
                                    <span className="animate-spin size-3 border-2 border-brand-500 border-t-transparent rounded-full" />
                                    <span>Menyimpan draf...</span>
                                </>
                            )}
                            {autosaveStatus === "saved" && (
                                <>
                                    <span className="size-2 rounded-full bg-green-500" />
                                    <span>Draf tersimpan</span>
                                </>
                            )}
                            {autosaveStatus === "error" && (
                                <>
                                    <span className="size-2 rounded-full bg-red-500" />
                                    <span className="text-red-500">Gagal simpan otomatis</span>
                                </>
                            )}
                        </>
                    )}
                </div>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onSaveDraft}
                        className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        Jadikan Draf
                    </button>
                    {isPublished ? (
                        <button
                            type="button"
                            onClick={onSaveChanges}
                            disabled={!hasUnsavedChanges || autosaveStatus === "saving"}
                            className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                        >
                            Simpan Perubahan
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={onPublish}
                            disabled={isPublishing}
                            className="rounded-xl bg-brand-500 hover:bg-brand-600 px-5 py-2 text-sm font-medium text-white shadow-xs transition-colors flex items-center gap-2 disabled:opacity-60"
                        >
                            {isPublishing && (
                                <span className="animate-spin size-3.5 border-2 border-white border-t-transparent rounded-full" />
                            )}
                            <span>Publikasikan</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};