import AsideArticle from "@/components/public/Article/AsideArticle";
import { getArticleBySlug } from "@/lib/data/article/article";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleDetail from "./ArticleDetail";
import ArticleCategoryListSection from "./ArticleCategoryListSection";

type ArticleDetailPageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: ArticleDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) return { title: "Artikel tidak ditemukan" }
  return {
    title: `${article.status !== "PUBLISHED" ? "Artikel tidak ditemukan" : article.title} - Rojo Safety`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt ?? "",
      images: article.thumbnail ?? "/images/no-image.jpg"
    }
  }
};

const SingleArticlePage = async ({ params }: ArticleDetailPageProps) => {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article || article.status !== "PUBLISHED") notFound()

  return (
    <>
      <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-30">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col-reverse gap-7.5 lg:flex-row xl:gap-12.5">
            {/* Sidebar */}
            <div className="md:w-1/2 lg:w-[32%]">
              {/* Search bar */}
              <div className="mb-10 rounded-md border border-stroke bg-white p-3.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
                <form
                  action="#"
                  method="POST"
                >
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search Here..."
                      className="w-full rounded-lg border border-stroke px-6 py-4 shadow-solid-12 focus:border-primary focus:outline-hidden dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
                    />

                    <button
                      className="absolute right-0 top-0 p-5"
                      aria-label="search-icon"
                    >
                      <svg
                        className="fill-black transition-all duration-300 hover:fill-primary dark:fill-white dark:hover:fill-primary"
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16.031 14.617L20.314 18.899L18.899 20.314L14.617 16.031C13.0237 17.3082 11.042 18.0029 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18.0029 11.042 17.3082 13.0237 16.031 14.617ZM14.025 13.875C15.2941 12.5699 16.0029 10.8204 16 9C16 5.132 12.867 2 9 2C5.132 2 2 5.132 2 9C2 12.867 5.132 16 9 16C10.8204 16.0029 12.5699 15.2941 13.875 14.025L14.025 13.875Z" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
              <ArticleCategoryListSection />
              <div className="flex flex-col gap-7.5">
                <AsideArticle title="Kegiatan Terbaru" typeFilter="berita" />
                <AsideArticle title="Postingan Terbaru" typeFilter="k3" />
              </div>
            </div>
            <div className="lg:w-2/3">
              <ArticleDetail article={article} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleArticlePage;
