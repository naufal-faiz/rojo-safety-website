import { prisma } from "@/lib/prisma";
import ArticleForm from "../ArticleForm";

const NewArticlePage = async () => {
    const categories = await prisma.articleCategory.findMany({
        orderBy: { name: "desc" },
    });
    return (
        <ArticleForm categories={categories} />
    )
}

export default NewArticlePage;


