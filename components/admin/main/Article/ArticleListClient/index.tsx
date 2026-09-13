"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { softDeleteArticle } from "@/lib/data/article/articleAction";
import { useTableFilter, usePagination } from "@/hooks";
import {FilterBar,Pagination,EmptyState} from "@/components/common";
import { EyeIcon } from "@/public/icons";

type ArticleItem = {
    id: string;
    title: string;
    slug: string;
    thumbnail: string | null;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    views: number;
    createdAt: Date | string;
    updatedAt: Date | string;
    category?: { id: string; name: string } | null;
};

export default function ArticleListClient({
    initialArticles,
}: {
    initialArticles: ArticleItem[];
}) {
    const [articles, setArticles] = useState<ArticleItem[]>(initialArticles);
    const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

    const { searchQuery, setSearchQuery, selectedStatus, setSelectedStatus, filteredData: filteredArticles,
    } = useTableFilter({
        data: articles, searchFields: (a) => [a.title, a.slug, a.category?.name ?? ""], statusField: "status",
    });

    const {
        currentPage, setCurrentPage, totalPages, paginatedData: paginatedArticles, totalItems
    } = usePagination(filteredArticles, 10)

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Apakah Anda yakin ingin menghapus artikel "${title}"?`)) {
            return;
        }

        try {
            setIsDeletingId(id);
            await softDeleteArticle(id);
            setArticles((prev) => prev.filter((a) => a.id !== id));
        } catch (err) {
            console.error("Failed to delete article:", err);
            alert("Gagal menghapus artikel.");
        } finally {
            setIsDeletingId(null);
        }
    };

    return (
        <div className="space-y-6">
            {/* Filter Bar */}
            <FilterBar searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                searchPlaceholder="Cari judul, kategori, atau slug..."
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                statusOptions={[
                    { value: "ALL", label: "Semua Status" },
                    { value: "PUBLISHED", label: "Dipublikasikan" },
                    { value: "DRAFT", label: "Draf" },
                ]}
            />
            {/* Articles Table */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-900">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50/75 dark:border-gray-800 dark:bg-gray-800/50 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                <th className="px-5 py-3.5">Artikel</th>
                                <th className="px-4 py-3.5">Kategori</th>
                                <th className="px-4 py-3.5">Status</th>
                                <th className="px-4 py-3.5">Views</th>
                                <th className="px-4 py-3.5">Terakhir Diubah</th>
                                <th className="px-5 py-3.5 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                            {paginatedArticles.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-5 py-12 text-center text-gray-500 dark:text-gray-400">
                                        <EmptyState title="Tidak ada artikel ditemukan" description="Silakan buat artikel baru atau sesuaikan filter pencarian." />
                                    </td>
                                </tr>
                            ) : (
                                paginatedArticles.map((article) => (
                                    <tr
                                        key={article.id}
                                        className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors"
                                    >
                                        {/* Thumbnail & Title */}
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3.5">
                                                <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                                    <Image
                                                        src={article.thumbnail || "/images/no-image.jpg"}
                                                        alt={article.title}
                                                        fill
                                                        className="object-cover"
                                                        sizes="48px"
                                                    />
                                                </div>
                                                <div className="min-w-0 max-w-sm">
                                                    <Link
                                                        href={`/admin/artikel/${article.id}`}
                                                        className="font-semibold text-gray-900 dark:text-white hover:text-brand-500 dark:hover:text-brand-400 line-clamp-1 transition-colors"
                                                    >
                                                        {article.title || "Tanpa Judul"}
                                                    </Link>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                        /artikel/{article.slug}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Category */}
                                        <td className="px-4 py-3.5 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                                {article.category?.name || "Tanpa Kategori"}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="px-4 py-3.5 whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${article.status === "PUBLISHED"
                                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                                    }`}
                                            >
                                                {article.status === "PUBLISHED" ? "Dipublikasikan" : "Draf"}
                                            </span>
                                        </td>

                                        {/* Views */}
                                        <td className="px-4 py-3.5 whitespace-nowrap text-xs text-gray-600 dark:text-gray-400">
                                            {article.views.toLocaleString("id-ID")}
                                        </td>

                                        {/* Last Modified */}
                                        <td className="px-4 py-3.5 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                                            {new Date(article.updatedAt).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </td>

                                        {/* Actions */}
                                        <td className="px-5 py-3.5 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/artikel/preview/${article.slug}`} className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-blue-light-400 hover:text-blue-light-700 bg-blue-light-50 hover:bg-blue-light-100 dark:bg-blue-light-950/40 dark:text-blue-light-400 dark:hover:bg-blue-light-950/60 rounded-lg transition-colors">
                                                    <EyeIcon /> Preview
                                                </Link>
                                                <Link
                                                    href={`/admin/artikel/${article.id}`}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/40 dark:text-brand-400 dark:hover:bg-brand-950/60 rounded-lg transition-colors"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    <span>Edit</span>
                                                </Link>
                                                <button
                                                    type="button"
                                                    disabled={isDeletingId === article.id}
                                                    onClick={() => handleDelete(article.id, article.title)}
                                                    className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors disabled:opacity-50"
                                                    title="Hapus Artikel"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} totalItems={totalItems} itemsPerPage={10} />
            </div>
        </div>
    );
}
