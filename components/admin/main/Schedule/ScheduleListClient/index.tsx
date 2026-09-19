"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { softDeleteTrainingSchedule } from "@/lib/data/training/trainingSchedule/trainingScheduleAction";
import DataListManager  from "@/components/admin/main/DataListManager";
import { ScheduleDisplayStatus } from "@/lib/utils/trainingScheduleStatus";

type ScheduleItem = {
    id: string;
    type: "PUBLIC" | "INHOUSE";
    status: "DRAFT" | "OPEN" | "CLOSED" | "CANCELLED";
    displayStatus: ScheduleDisplayStatus;
    startAt: Date | string;
    endAt: Date | string;
    location: string | null;
    price: number | string;
    quota: number;
    batch: number;
    approvedCount: number;
    training?: { id: string; title: string; slug: string } | null;
};

type SchedulePagination = { page: number; limit: number; totalItems: number; totalPages: number };

const STATUS_BADGE: Record<ScheduleDisplayStatus, string> = {
    DRAFT: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    OPEN: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    CLOSED: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    FULL: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    COMPLETED: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

const STATUS_LABEL: Record<ScheduleDisplayStatus, string> = {
    DRAFT: "Draf",
    OPEN: "Terbuka",
    CLOSED: "Tutup",
    CANCELLED: "Dibatalkan",
    FULL: "Penuh",
    COMPLETED: "Selesai",
};

export default function ScheduleListClient({
    schedules,
    pagination,
    searchQuery,
    selectedStatus,
}: {
    schedules: ScheduleItem[];
    pagination: SchedulePagination;
    searchQuery: string;
    selectedStatus: string;
}) {
    const router = useRouter();
    const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Apakah Anda yakin ingin menghapus jadwal "${title}"?`)) return;

        try {
            setIsDeletingId(id);
            await softDeleteTrainingSchedule(id);
            router.refresh();
        } catch (err) {
            console.error("Failed to delete schedule:", err);
            alert("Gagal menghapus jadwal.");
        } finally {
            setIsDeletingId(null);
        }
    };

    return (
        <DataListManager<ScheduleItem>
            data={schedules}
            pagination={pagination}
            searchQuery={searchQuery}
            selectedStatus={selectedStatus}
            searchPlaceholder="Cari nama training..."
            itemLabel="jadwal"
            emptyTitle="Tidak ada jadwal ditemukan"
            emptyDescription="Silakan buat jadwal training baru atau sesuaikan filter pencarian."
            statusOptions={[
                { value: "ALL", label: "Semua Status" },
                { value: "DRAFT", label: "Draf" },
                { value: "OPEN", label: "Terbuka" },
                { value: "CLOSED", label: "Tutup" },
                { value: "CANCELLED", label: "Dibatalkan" },
            ]}
            columns={[
                { label: "Training & Batch", className: "px-5 py-3.5" },
                { label: "Jadwal" },
                { label: "Kuota" },
                { label: "Tipe" },
                { label: "Status" },
                { label: "Aksi", className: "px-5 py-3.5 text-right" },
            ]}
            renderRow={(schedule) => (
                <tr
                    key={schedule.id}
                    className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors"
                >
                    <td className="px-5 py-3.5">
                        <Link
                            href={`/admin/training/jadwal/${schedule.id}`}
                            className="font-semibold text-gray-900 dark:text-white hover:text-brand-500 dark:hover:text-brand-400 line-clamp-1 transition-colors"
                        >
                            {schedule.training?.title || "Tanpa Training"}
                        </Link>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Batch {schedule.batch}
                            {schedule.location ? ` · ${schedule.location}` : ""}
                        </p>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap text-xs text-gray-600 dark:text-gray-400">
                        <div>
                            {new Date(schedule.startAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                        </div>
                        <div className="text-gray-400">
                            s/d {new Date(schedule.endAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                        </div>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            {schedule.approvedCount}/{schedule.quota}
                        </span>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                            {schedule.type === "PUBLIC" ? "Publik" : "Inhouse"}
                        </span>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_BADGE[schedule.displayStatus]}`}>
                            {STATUS_LABEL[schedule.displayStatus]}
                        </span>
                    </td>

                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                            <Link
                                href={`/admin/training/jadwal/${schedule.id}`}
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/40 dark:text-brand-400 dark:hover:bg-brand-950/60 rounded-lg transition-colors"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <span>Kelola</span>
                            </Link>
                            <button
                                type="button"
                                disabled={isDeletingId === schedule.id}
                                onClick={() => handleDelete(schedule.id, schedule.training?.title || "jadwal ini")}
                                className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors disabled:opacity-50"
                                title="Hapus Jadwal"
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