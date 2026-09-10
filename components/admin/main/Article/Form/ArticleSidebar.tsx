"use client";

import ThumbnailUpload from "../ThumbnailUpload";
import { ArticleStatusType, Category, InitialArticle } from "./types";

interface ArticleSidebarProps {
    categories: Category[];
    categoryId: string;
    thumbnail: string;
    articleStatus: ArticleStatusType;
    initialData?: InitialArticle | null;
    title: string;
    slug: string;
    excerpt: string;
    onCategoryChange: (categoryId: string) => void;
    onThumbnailChange: (thumbnailUrl: string) => void;
}

export const ArticleSidebar = ({
    categories,
    categoryId,
    thumbnail,
    articleStatus,
    initialData,
    title,
    slug,
    excerpt,
    onCategoryChange,
    onThumbnailChange,
}: ArticleSidebarProps) => {
    return (
        <div className="lg:col-span-4 space-y-6">
            {/* Publication & Status Card */}
            <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-3">
                    Status & Publikasi
                </h3>
                <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Status Saat Ini:</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                            {articleStatus === "PUBLISHED" ? "Dipublikasikan" : "Draf"}
                        </span>
                    </div>
                    {initialData?.views !== undefined && (
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Total Dilihat:</span>
                            <span className="font-semibold text-gray-800 dark:text-gray-200">
                                {initialData.views} views
                            </span>
                        </div>
                    )}
                    {initialData?.createdAt && (
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Dibuat:</span>
                            <span className="text-gray-700 dark:text-gray-300 text-xs">
                                {new Date(initialData.createdAt).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </span>
                        </div>
                    )}
                    {initialData?.updatedAt && (
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Terakhir Diubah:</span>
                            <span className="text-gray-700 dark:text-gray-300 text-xs">
                                {new Date(initialData.updatedAt).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Category Selection Card */}
            <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-3">
                    Kategori Artikel <span className="text-red-500">*</span>
                </h3>
                <div>
                    {categories.length > 0 ? (
                        <select
                            value={categoryId}
                            onChange={(e) => onCategoryChange(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 bg-white p-2.5 text-sm text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        >
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p className="text-xs text-amber-600 dark:text-amber-400">
                            Belum ada kategori yang dibuat.
                        </p>
                    )}
                </div>
            </div>

            {/* Thumbnail Card */}
            <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                        Gambar Utama (Thumbnail)
                    </h3>
                </div>
                <ThumbnailUpload
                    value={thumbnail}
                    onChange={onThumbnailChange}
                />
            </div>

            {/* Search / Social Snippet Preview */}
            <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-3">
                    Pratinjau Hasil Pencarian (SEO)
                </h3>
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 space-y-1 text-xs">
                    <div className="text-blue-600 dark:text-blue-400 font-medium line-clamp-1 text-sm">
                        {title || "Judul Artikel Anda"}
                    </div>
                    <div className="text-green-700 dark:text-green-500 text-[11px] truncate">
                        https://rojosafety.com/artikel/{slug || "slug-artikel"}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-xs line-clamp-2">
                        {excerpt || "Ringkasan artikel akan tampil di sini sebagai deskripsi hasil pencarian mesin pencari..."}
                    </div>
                </div>
            </div>
        </div>
    );
};
