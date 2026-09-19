"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    approveRegistration,
    rejectRegistration,
} from "@/lib/data/training/trainingRegistration/trainingRegistrationAction";
import  DataListManager  from "@/components/admin/main/DataListManager";
import { RegistrationStatus } from "@/lib/generated/prisma/enums";

type RegistrationItem = {
    id: string;
    trainingScheduleId: string;
    name: string;
    email: string;
    phone: string | null;
    company: string | null;
    status: RegistrationStatus;
    reviewedAt: Date | string | null;
    rejectionReason: string | null;
    createdAt: Date | string;
    schedule?: {
        id: string;
        batch: number;
        startAt: Date | string;
        training?: { title: string } | null;
    } | null;
};

type RegistrationPagination = { page: number; limit: number; totalItems: number; totalPages: number };

const STATUS_BADGE: Record<RegistrationStatus, string> = {
    PENDING: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    APPROVED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    REJECTED: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const STATUS_LABEL: Record<RegistrationStatus, string> = {
    PENDING: "Menunggu",
    APPROVED: "Diterima",
    REJECTED: "Ditolak",
};

export default function RegistrationListClient({
    registrations,
    pagination,
    searchQuery,
    selectedStatus,
}: {
    registrations: RegistrationItem[];
    pagination: RegistrationPagination;
    searchQuery: string;
    selectedStatus: string;
}) {
    const router = useRouter();
    const [processingId, setProcessingId] = useState<string | null>(null);

    const handleApprove = async (id: string, name: string) => {
        if (!confirm(`Terima pendaftaran "${name}"? Kuota jadwal akan berkurang 1.`)) return;

        try {
            setProcessingId(id);
            await approveRegistration(id);
            router.refresh();
        } catch (err) {
            console.error("Failed to approve registration:", err);
            alert(err instanceof Error ? err.message : "Gagal menerima pendaftaran.");
        } finally {
            setProcessingId(null);
        }
    };

    const handleReject = async (id: string, name: string) => {
        const reason = prompt(`Alasan menolak pendaftaran "${name}":`);
        if (reason === null) return; // batal
        if (!reason.trim()) {
            alert("Alasan penolakan harus diisi.");
            return;
        }

        try {
            setProcessingId(id);
            await rejectRegistration(id, reason.trim());
            router.refresh();
        } catch (err) {
            console.error("Failed to reject registration:", err);
            alert(err instanceof Error ? err.message : "Gagal menolak pendaftaran.");
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <DataListManager<RegistrationItem>
            data={registrations}
            pagination={pagination}
            searchQuery={searchQuery}
            selectedStatus={selectedStatus}
            searchPlaceholder="Cari nama atau email peserta..."
            itemLabel="pendaftaran"
            emptyTitle="Tidak ada pendaftaran ditemukan"
            emptyDescription="Belum ada peserta yang mendaftar, atau sesuaikan filter pencarian."
            statusOptions={[
                { value: "ALL", label: "Semua Status" },
                { value: "PENDING", label: "Menunggu" },
                { value: "APPROVED", label: "Diterima" },
                { value: "REJECTED", label: "Ditolak" },
            ]}
            columns={[
                { label: "Peserta", className: "px-5 py-3.5" },
                { label: "Training & Batch" },
                { label: "Perusahaan" },
                { label: "Tanggal Daftar" },
                { label: "Status" },
                { label: "Aksi", className: "px-5 py-3.5 text-right" },
            ]}
            renderRow={(reg) => (
                <tr
                    key={reg.id}
                    className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors"
                >
                    <td className="px-5 py-3.5">
                        <p className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                            {reg.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{reg.email}</p>
                        {reg.phone && (
                            <p className="text-[11px] text-gray-400 dark:text-gray-500">{reg.phone}</p>
                        )}
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                        <Link
                            href={`/admin/training/jadwal/${reg.trainingScheduleId}`}
                            className="text-sm text-gray-800 dark:text-gray-200 hover:text-brand-500 dark:hover:text-brand-400 line-clamp-1"
                        >
                            {reg.schedule?.training?.title || "-"}
                        </Link>
                        <p className="text-xs text-gray-400">
                            Batch {reg.schedule?.batch ?? "-"}
                            {reg.schedule?.startAt &&
                                ` · ${new Date(reg.schedule.startAt).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}`}
                        </p>
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap text-xs text-gray-600 dark:text-gray-400">
                        {reg.company || "-"}
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                        {new Date(reg.createdAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                        <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_BADGE[reg.status]}`}
                        >
                            {STATUS_LABEL[reg.status]}
                        </span>
                        {reg.status === "REJECTED" && reg.rejectionReason && (
                            <p className="text-[11px] text-gray-400 mt-1 max-w-[160px] line-clamp-2" title={reg.rejectionReason}>
                                {reg.rejectionReason}
                            </p>
                        )}
                    </td>

                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                        {reg.status === "PENDING" ? (
                            <div className="flex items-center justify-end gap-2">
                                <button
                                    type="button"
                                    disabled={processingId === reg.id}
                                    onClick={() => handleApprove(reg.id, reg.name)}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-green-700 hover:text-green-800 bg-green-50 hover:bg-green-100 dark:bg-green-950/40 dark:text-green-400 dark:hover:bg-green-950/60 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    {processingId === reg.id ? "Memproses..." : "Terima"}
                                </button>
                                <button
                                    type="button"
                                    disabled={processingId === reg.id}
                                    onClick={() => handleReject(reg.id, reg.name)}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950/60 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    Tolak
                                </button>
                            </div>
                        ) : (
                            <span className="text-xs text-gray-400">
                                {reg.reviewedAt
                                    ? `Diproses ${new Date(reg.reviewedAt).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                    })}`
                                    : "-"}
                            </span>
                        )}
                    </td>
                </tr>
            )}
        />
    );
}