import MainArticlePageSection from "@/app/(public)/artikel/[slug]/MainArticlePageSection"
import { getArticleBySlug } from "@/lib/data/article/article"
import Link from "next/link"
import { notFound } from "next/navigation"

type ArticlePreviewProps = { params: Promise<{ preview: string[] }> }

const PreviewPage = async ({ params }: ArticlePreviewProps) => {
  const { preview } = await params
  const slug = preview[preview.length - 1]
  const article = await getArticleBySlug(slug)

  if (!article) notFound()

  return (
    <section>
      <div className="flex flex-col mx-4 mb-10 gap-4 sm:flex-row sm:items-center sm:justify-between bg-white dark:bg-gray-900 p-4 sm:p-5 rounded-2xl border border-stroke dark:border-strokedark shadow-solid-13">
        {/* Title & Back */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/artikel"
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-stroke hover:border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-strokedark dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            title="Kembali ke Daftar Artikel"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Preview Artikel {article.title}
              </h1>
              <span
                className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${article.status === "PUBLISHED"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}
              >
                {article.status === "PUBLISHED" ? "Dipublikasikan" : "Draf"}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Tampilan ini merupakan preview yang sama persis akan ditampilkan secara publik
            </p>
          </div>
        </div>
      </div>
      <div className="px-4">
        <MainArticlePageSection article={article} />
      </div>
    </section>
  )
}

export default PreviewPage
