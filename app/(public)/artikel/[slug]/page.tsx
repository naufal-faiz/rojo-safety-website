import { getArticleBySlug } from "@/lib/data/article";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import MainArticlePageSection from "./MainArticlePageSection";

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
    <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-30">
      <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        <MainArticlePageSection article={article} />
      </div>
    </section>
  );
};

export default SingleArticlePage;
