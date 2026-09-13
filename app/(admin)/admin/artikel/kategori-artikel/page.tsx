import {ArticleCategoryManager} from "@/components/admin/main/ArticleCategory"
import { getAllArticleCategories } from "@/lib/data/article/articleCategory"

const CategoryPage = async () => {
  const categories = await getAllArticleCategories()
  return <ArticleCategoryManager initialCategories={categories} />;
}

export default CategoryPage
