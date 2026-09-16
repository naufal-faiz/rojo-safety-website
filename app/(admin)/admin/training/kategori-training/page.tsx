import { CategoryManager } from "@/components/admin/main/Category";
import { getAllTrainingCategories } from "@/lib/data/training/trainingCategory";
import { getTotalTrainings, getPublishedTrainings } from "@/lib/data/training/training";
import { createTrainingCategory, updateTrainingCategory, softDeleteTrainingCategory } from "@/lib/data/training/trainingCategoryAction";

type PageProps = { searchParams: Promise<{ search?: string; page?: string; }> };

export default async function TrainingCategoryPage({ searchParams, }: PageProps) {
    const params = await searchParams;
    const search = params.search ?? "";
    const page = Math.max(1, Number(params.page ?? "1") || 1);
    const limit = 10;
    const [categoryResult, totalTrainings, publishedTrainings] = await Promise.all([
        getAllTrainingCategories({ search, page, limit, }),
        getTotalTrainings(),
        getPublishedTrainings(),
    ]);

    return (
        <CategoryManager
            initialCategories={categoryResult.data}
            pagination={categoryResult.pagination}
            searchQuery={search}
            totalCategories={categoryResult.totalCategories}
            totalItems={totalTrainings ?? 0}
            publishedItems={publishedTrainings ?? 0}
            title="Kategori Training"
            description="Kelola kategori yang digunakan pada training."
            singularLabel="Kategori"
            pluralLabel="Kategori Training"
            itemLabel="Training"
            createCategory={createTrainingCategory}
            updateCategory={updateTrainingCategory}
            deleteCategory={softDeleteTrainingCategory}
        />
    );
}