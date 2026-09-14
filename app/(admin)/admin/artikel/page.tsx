import { ArticleListClient } from "@/components/admin/main/Article";
import { getAllArticlesForAdmin } from "@/lib/data/article";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

const ArticlesPage = async () => {
    const [articles, totalCount, publishedCount, draftCount] = await Promise.all([
        getAllArticlesForAdmin(),
        prisma.article.count({ where: { deletedAt: null } }),
        prisma.article.count({ where: { deletedAt: null, status: "PUBLISHED" } }),
        prisma.article.count({ where: { deletedAt: null, status: "DRAFT" } }),
    ]);

    return (
        <div className="space-y-6">
            {/* Header with Title and Create Button */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Manajemen Artikel
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Kelola seluruh artikel edukasi, berita K3, dan publikasi pelatihan
                    </p>
                </div>
                <Link
                    href="/admin/artikel/create"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 px-4 py-2.5 text-sm font-medium text-white shadow-xs transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Buat Artikel Baru</span>
                </Link>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Artikel</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {totalCount}
                    </h3>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
                    <p className="text-xs font-medium text-green-600 dark:text-green-400">Dipublikasikan</p>
                    <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mt-1">
                        {publishedCount}
                    </h3>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
                    <p className="text-xs font-medium text-amber-600 dark:text-amber-400">Draf</p>
                    <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-400 mt-1">
                        {draftCount}
                    </h3>
                </div>
            </div>

            {/* Articles Table and Filter */}
            <ArticleListClient initialArticles={articles} />
        </div>
    );
};

export default ArticlesPage;
