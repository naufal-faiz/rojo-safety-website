import { prisma } from "@/lib/prisma";
import ArticleForm from "../../ArticleForm";
import { notFound } from "next/navigation";

type EditArticleProps = { params: Promise<{ id: string }> };

const EditArticlePage = async ({ params }: EditArticleProps) => {
    const { id } = await params;

    const [categories, article] = await Promise.all([
        prisma.articleCategory.findMany({
            orderBy: { name: "asc" },
        }),
        prisma.article.findUnique({
            where: { id },
            include: { category: true },
        }),
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
