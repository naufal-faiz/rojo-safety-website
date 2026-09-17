"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterBar, Pagination, EmptyState } from "@/components/common";

type DataListPagination = {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
};

type StatusOption = { value: string; label: string };

type Column = { label: string; className?: string };

type DataListManagerProps<T extends { id: string }> = {
    data: T[];
    pagination: DataListPagination;
    searchQuery: string;
    selectedStatus?: string;
    searchPlaceholder?: string;
    statusOptions?: StatusOption[];
    columns: Column[];
    renderRow: (item: T, sequence: number) => ReactNode;
    itemLabel?: string;
    emptyTitle?: string;
    emptyDescription?: string;
};

export default function DataListManager<T extends { id: string }>({
    data,
    pagination,
    searchQuery,
    selectedStatus = "ALL",
    searchPlaceholder = "Cari...",
    statusOptions,
    columns,
    renderRow,
    itemLabel = "item",
    emptyTitle = "Tidak ada data ditemukan",
    emptyDescription = "Silakan sesuaikan filter pencarian.",
}: DataListManagerProps<T>) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchQuery);
    const [status, setStatus] = useState(selectedStatus);

    useEffect(() => setSearch(searchQuery), [searchQuery]);
    useEffect(() => setStatus(selectedStatus), [selectedStatus]);

    /*
     * SEARCH DEBOUNCE -> dorong ke URL, page kembali ke 1
     */
    useEffect(() => {
        const timeout = setTimeout(() => {
            const currentSearch = searchParams.get("search") ?? "";
            if (search === currentSearch) return;

            const params = new URLSearchParams(searchParams.toString());
            if (search.trim()) {
                params.set("search", search.trim());
            } else {
                params.delete("search");
            }
            params.set("page", "1");
            router.replace(`${pathname}?${params.toString()}`);
        }, 400);
        return () => clearTimeout(timeout);
    }, [search, pathname, router, searchParams]);

    /*
     * STATUS FILTER -> langsung ke URL (tanpa debounce, karena select bukan ketikan)
     */
    const handleStatusChange = (value: string) => {
        setStatus(value);
        const params = new URLSearchParams(searchParams.toString());
        if (value && value !== "ALL") {
            params.set("status", value);
        } else {
            params.delete("status");
        }
        params.set("page", "1");
        router.replace(`${pathname}?${params.toString()}`);
    };

    /*
     * PAGINATION
     */
    const handlePageChange = (page: number) => {
        if (page < 1 || page > pagination.totalPages || page === pagination.page) return;
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="space-y-6">
            <FilterBar
                searchQuery={search}
                onSearchChange={setSearch}
                searchPlaceholder={searchPlaceholder}
                selectedStatus={status}
                onStatusChange={statusOptions ? handleStatusChange : undefined}
                statusOptions={statusOptions}
            />

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-900">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50/75 dark:border-gray-800 dark:bg-gray-800/50 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                {columns.map((col) => (
                                    <th key={col.label} className={col.className ?? "px-4 py-3.5"}>
                                        {col.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length} className="px-5 py-12 text-center text-gray-500 dark:text-gray-400">
                                        <EmptyState
                                            title={searchQuery ? "Tidak ditemukan" : emptyTitle}
                                            description={
                                                searchQuery
                                                    ? "Coba gunakan kata kunci pencarian lain."
                                                    : emptyDescription
                                            }
                                        />
                                    </td>
                                </tr>
                            ) : (
                                data.map((item, index) =>
                                    renderRow(item, (pagination.page - 1) * pagination.limit + index + 1)
                                )
                            )}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                    totalItems={pagination.totalItems}
                    itemsPerPage={pagination.limit}
                    itemLabel={itemLabel}
                />
            </div>
        </div>
    );
}