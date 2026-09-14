import { ArticleForm } from "@/components/admin/main/Article";
import { notFound } from "next/navigation";
import { getAllArticleCategories } from "@/lib/data/article/articleCategory";
import { getArticleById } from "@/lib/data/article/article";

type EditArticleProps = { params: Promise<{ id: string }> };

const EditArticlePage = async ({ params }: EditArticleProps) => {
    const { id } = await params;

    const [categories, article] = await Promise.all([
        getAllArticleCategories(),
        getArticleById(id)
    ]);

    if (!article) {
        notFound();
    }

    return (
        <ArticleForm
            categories={categories}
            initialData={article}
            articleId={id}
        />
    );
};

export default EditArticlePage;
