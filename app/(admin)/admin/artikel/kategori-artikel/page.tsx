import { CategoryManager } from "@/components/admin/main/Category";

import {
    getAllArticleCategories,
} from "@/lib/data/article/articleCategory";

import {
    getTotalArticles,
} from "@/lib/data/article/article";

import {
    createArticleCategory,
    updateArticleCategory,
    softDeleteArticleCategory,
} from "@/lib/data/article/articleCategoryAction";

type PageProps = {
    searchParams: Promise<{
        search?: string;
        page?: string;
    }>;
};

export default async function ArticleCategoryPage({
    searchParams,
}: PageProps) {
    const params = await searchParams;

    const search = params.search ?? "";

    const page = Math.max(
        1,
        Number(params.page ?? "1") || 1
    );

    const limit = 10;

    const [
        categoryResult,
        totalArticles,
        publishedArticles,
    ] = await Promise.all([
        getAllArticleCategories({
            search,
            page,
            limit,
        }),

        getTotalArticles(),

        getTotalArticles({ status: "PUBLISHED" }),
    ]);

    return (
        <CategoryManager
            initialCategories={
                categoryResult.data
            }
            pagination={
                categoryResult.pagination
            }
            searchQuery={search}
            totalCategories={
                categoryResult.totalCategories
            }
            totalItems={totalArticles ?? 0}
            publishedItems={
                publishedArticles ?? 0
            }
            title="Kategori Artikel"
            description="Kelola kategori yang digunakan pada artikel."
            singularLabel="Kategori"
            pluralLabel="Kategori Artikel"
            itemLabel="Artikel"
            createCategory={
                createArticleCategory
            }
            updateCategory={
                updateArticleCategory
            }
            deleteCategory={
                softDeleteArticleCategory
            }
        />
    );
}