import ArticleItem from "@/components/public/Article/ArticleItem";
import ArticleFilterBar from "@/components/public/Article/ArticleFilterBar";
import ArticlePagination from "@/components/public/Article/ArticlePagination";
import { getAllArticles } from "@/lib/data/article/article";
import { getAllArticleCategories } from "@/lib/data/article/articleCategory";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artikel & Berita - Rojo Safety",
  description: "Artikel dan Berita terbaru dari rojosafety"
};

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ search?: string; category?: string; page?: string }>;
};

const ArticlePage = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const search = params.search ?? "";
  const category = params.category && params.category !== "ALL" ? params.category : undefined;
  const page = Math.max(1, Number(params.page ?? "1") || 1);
  const limit = 9;

  const [articles, categoriesResult] = await Promise.all([
    getAllArticles({ status: "PUBLISHED", categoryName: category, search, page, limit }),
    getAllArticleCategories({ limit: 100 }),
  ]);

  return (
    <section className="py-20 xl:py-20">
      <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
        <ArticleFilterBar
          categories={categoriesResult.data}
          selectedCategory={category ?? "ALL"}
        />

        {articles.data.length === 0 ? (
          <div className="mt-12.5 rounded-lg border border-stroke bg-white p-10 text-center dark:border-strokedark dark:bg-blacksection">
            <p className="font-medium text-black dark:text-white">
              Artikel tidak ditemukan
            </p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Coba ubah kata kunci pencarian atau kategori.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {articles.data.map((article) => (
              <ArticleItem article={article} key={article.id} />
            ))}
          </div>
        )}

        <ArticlePagination
          currentPage={articles.pagination.page}
          totalPages={articles.pagination.totalPages}
        />
      </div>
    </section>
  );
};

export default ArticlePage;