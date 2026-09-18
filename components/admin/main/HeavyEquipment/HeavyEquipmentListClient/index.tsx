"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { softDeleteHeavyEquipment } from "@/lib/data/training/heavyEquipmentAction";
import DataListManager from "@/components/admin/main/DataListManager";
import { HeavyEquipment } from "@/types";

type HeavyEquipmentPagination = {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
};

export default function HeavyEquipmentListClient({
    equipments,
    pagination,
    searchQuery,
}: {
    equipments: HeavyEquipment[];
    pagination: HeavyEquipmentPagination;
    searchQuery: string;
}) {
    const router = useRouter();
    const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Apakah Anda yakin ingin menghapus alat berat "${name}"?`)) {
            return;
        }

        try {
            setIsDeletingId(id);
            await softDeleteHeavyEquipment(id);
            router.refresh();
        } catch (err) {
            console.error("Failed to delete heavy equipment:", err);
            alert("Gagal menghapus alat berat.");
        } finally {
            setIsDeletingId(null);
        }
    };

    return (
        <DataListManager<HeavyEquipment>
            data={equipments}
            pagination={pagination}
            searchQuery={searchQuery}
            selectedStatus="ALL"
            searchPlaceholder="Cari nama alat berat..."
            itemLabel="alat berat"
            emptyTitle="Tidak ada alat berat ditemukan"
            emptyDescription="Silakan buat alat berat baru atau sesuaikan filter pencarian."
            columns={[
                { label: "Alat Berat", className: "px-5 py-3.5" },
                { label: "Kategori" },
                { label: "Deskripsi" },
                { label: "Dibuat" },
                { label: "Aksi", className: "px-5 py-3.5 text-right" },
            ]}
            renderRow={(equipment) => (
                <tr
                    key={equipment.id}
                    className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors"
                >
                    <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3.5">
                            <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                <Image
                                    src={equipment.image || "/images/no-image.jpg"}
                                    alt={equipment.name}
                                    fill
                                    className="object-cover"
                                    sizes="48px"
                                />
                            </div>
                            <div className="min-w-0 max-w-sm">
                                <Link
                                    href={`/admin/training/jenis-alat/${equipment.id}`}
                                    className="font-semibold text-gray-900 dark:text-white hover:text-brand-500 dark:hover:text-brand-400 line-clamp-1 transition-colors"
                                >
                                    {equipment.name || "Tanpa Nama"}
                                </Link>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    ID: {equipment.id.substring(0, 8)}...
                                </p>
                            </div>
                        </div>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                            {equipment.category?.name || "Tanpa Kategori"}
                        </span>
                    </td>

                    <td className="px-4 py-3.5">
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                            {equipment.description || "-"}
                        </p>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                        {equipment.createdAt
                            ? new Date(equipment.createdAt).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })
                            : "-"}
                    </td>

                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                            <Link
                                href={`/admin/training/jenis-alat/${equipment.id}`}
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/40 dark:text-brand-400 dark:hover:bg-brand-950/60 rounded-lg transition-colors"
                            >
                                <svg
                                    className="w-3.5 h-3.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                                <span>Edit</span>
                            </Link>
                            <button
                                type="button"
                                disabled={isDeletingId === equipment.id}
                                onClick={() => handleDelete(equipment.id, equipment.name)}
                                className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors disabled:opacity-50"
                                title="Hapus Alat Berat"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </td>
                </tr>
            )}
        />
    );
}
