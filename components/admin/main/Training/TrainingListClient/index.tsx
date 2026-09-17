"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { softDeleteTrainingData } from "@/lib/data/training/trainingAction";
import DataListManager from "@/components/admin/main/DataListManager";
import { CertificationType, PublishedStatus } from "@/lib/generated/prisma/enums";

type TrainingItem = {
    id: string;
    title: string;
    slug: string;
    image: string | null;
    status: PublishedStatus;
    certification: CertificationType;
    updatedAt: Date | string;
    category?: { id: string; name: string } | null;
};

type TrainingPagination = { page: number; limit: number; totalItems: number; totalPages: number };

export default function TrainingListClient({
    trainings,
    pagination,
    searchQuery,
    selectedStatus,
}: {
    trainings: TrainingItem[];
    pagination: TrainingPagination;
    searchQuery: string;
    selectedStatus: string;
}) {
    const router = useRouter();
    const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Apakah Anda yakin ingin menghapus training "${title}"?`)) {
            return;
        }

        try {
            setIsDeletingId(id);
            await softDeleteTrainingData(id);
            router.refresh();
        } catch (err) {
            console.error("Failed to delete training:", err);
            alert("Gagal menghapus training.");
        } finally {
            setIsDeletingId(null);
        }
    };

    return (
        <DataListManager<TrainingItem>
            data={trainings}
            pagination={pagination}
            searchQuery={searchQuery}
            selectedStatus={selectedStatus}
            searchPlaceholder="Cari judul, kategori, atau slug..."
            itemLabel="training"
            emptyTitle="Tidak ada training ditemukan"
            emptyDescription="Silakan buat training baru atau sesuaikan filter pencarian."
            statusOptions={[
                { value: "ALL", label: "Semua Status" },
                { value: "PUBLISHED", label: "Dipublikasikan" },
                { value: "DRAFT", label: "Draf" },
            ]}
            columns={[
                { label: "Training", className: "px-5 py-3.5" },
                { label: "Kategori" },
                { label: "Sertifikasi" },
                { label: "Status" },
                { label: "Terakhir Diubah" },
                { label: "Aksi", className: "px-5 py-3.5 text-right" },
            ]}
            renderRow={(training) => (
                <tr
                    key={training.id}
                    className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors"
                >
                    <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3.5">
                            <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                <Image
                                    src={training.image || "/images/no-image.jpg"}
                                    alt={training.title}
                                    fill
                                    className="object-cover"
                                    sizes="48px"
                                />
                            </div>
                            <div className="min-w-0 max-w-sm">
                                <Link
                                    href={`/admin/training/${training.id}`}
                                    className="font-semibold text-gray-900 dark:text-white hover:text-brand-500 dark:hover:text-brand-400 line-clamp-1 transition-colors"
                                >
                                    {training.title || "Tanpa Judul"}
                                </Link>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    /training/{training.slug}
                                </p>
                            </div>
                        </div>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                            {training.category?.name || "Tanpa Kategori"}
                        </span>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap text-xs text-gray-600 dark:text-gray-400">
                        {training.certification === "NONE" ? "-" : training.certification}
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                        <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${training.status === "PUBLISHED"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                }`}
                        >
                            {training.status === "PUBLISHED" ? "Dipublikasikan" : "Draf"}
                        </span>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                        {new Date(training.updatedAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </td>

                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                            <Link
                                href={`/admin/training/${training.id}`}
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/40 dark:text-brand-400 dark:hover:bg-brand-950/60 rounded-lg transition-colors"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <span>Edit</span>
                            </Link>
                            <button
                                type="button"
                                disabled={isDeletingId === training.id}
                                onClick={() => handleDelete(training.id, training.title)}
                                className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors disabled:opacity-50"
                                title="Hapus Training"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </td>
                </tr>
            )}
        />
    );
}