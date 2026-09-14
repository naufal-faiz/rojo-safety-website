import { CategoryManager } from "@/components/admin/main/Category";
import { getAllTrainingCategories, getTotalTrainings } from "@/lib/data/training";
import {
    createTrainingCategory,
    updateTrainingCategory,
    softDeleteTrainingCategory,
} from "@/lib/data/training/trainingCategoryAction";

export default async function TrainingCategoryPage() {
    const categories = await getAllTrainingCategories();
    const totalTrainings = await getTotalTrainings();

    return (
        <CategoryManager
            initialCategories={categories}
            title="Kategori Training"
            description="Kelola kategori yang digunakan pada training."
            singularLabel="Kategori"
            pluralLabel="Kategori"
            totalItems={totalTrainings}
            itemLabel="Training"
            createCategory={createTrainingCategory}
            updateCategory={updateTrainingCategory}
            deleteCategory={softDeleteTrainingCategory}
        />
    );
}