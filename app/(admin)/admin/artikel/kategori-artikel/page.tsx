import { CategoryManager } from "@/components/admin/main/Category";
import { getAllArticleCategories, getTotalArticles } from "@/lib/data/article";
import {
    createArticleCategory,
    updateArticleCategory,
    softDeleteArticleCategory,
} from "@/lib/data/article";

const CategoryPage = async () => {
    const categories = await getAllArticleCategories();
    const totalArticles = await getTotalArticles()

    return (
        <CategoryManager
            initialCategories={categories}
            title="Kategori Artikel"
            description="Kelola kategori untuk mengelompokkan artikel edukasi dan informasi K3."
            singularLabel="kategori"
            pluralLabel="kategori artikel"
            itemLabel="Artikel"
            totalItems={totalArticles}
            createCategory={createArticleCategory}
            updateCategory={updateArticleCategory}
            deleteCategory={softDeleteArticleCategory}
        />
    );
};

export default CategoryPage;