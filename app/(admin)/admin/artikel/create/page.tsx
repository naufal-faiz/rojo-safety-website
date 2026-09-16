import { ArticleForm } from "@/components/admin/main/Article";
import { getAllArticleCategories } from "@/lib/data/article/articleCategory";

const NewArticlePage = async () => {
    const categories = await getAllArticleCategories()
    return (
        <ArticleForm categories={categories.data} />
    )
}

export default NewArticlePage;