import ArticleItem from "@/components/public/Article/ArticleItem";
import { getPublishedArticles } from "@/lib/data/article/article";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artikel & Berita - Rojo Safety",

  // other metadata
  description: "Artikel dan Berita terbaru dari rojosafety"
};

const ArticlePage = async () => {
  const articles = await getPublishedArticles()
  return (
    <>
      {/* <!-- ===== Article Grid Start ===== --> */}
      <section className="py-20 xl:py-20">
        <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {articles.map((article) => (
              <ArticleItem article={article} key={article.id}/>
            ))}
          </div>
        </div>
      </section>
      {/* <!-- ===== Article Grid End ===== --> */}
    </>
  );
};

export default ArticlePage;
