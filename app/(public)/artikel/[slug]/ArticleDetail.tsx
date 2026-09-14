import SharePost from "@/components/public/Article/SharePost";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import type { ArticleWithCategory } from "@/types";

const ArticleDetail = ({ article }: { article: ArticleWithCategory }) => {
    const formattedDate = article.createdAt
        ? new Date(article.createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        : "-";

    // Calculate reading time
    const textContent = article.content ? article.content.replace(/<[^>]*>/g, " ").trim() : "";
    const wordCount = textContent ? textContent.split(/\s+/).length : 0;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    return (
        <article className="animate_top rounded-xl border border-stroke bg-white p-6 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">
            {/* Category Badge */}
            {article.category && (
                <div className="mb-4">
                    <Link
                        href={`/artikel/kategori/${article.category.name}`}
                        className="inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white dark:bg-primary/20 dark:text-brand-300 dark:hover:bg-primary dark:hover:text-white"
                    >
                        {article.category.name}
                    </Link>
                </div>
            )}

            {/* Article Main Title */}
            <h1 className="mb-5 text-2xl font-bold leading-tight text-black dark:text-white sm:text-3xl md:text-4xl lg:leading-[1.25]">
                {article.title}
            </h1>

            {/* Meta info (Author, Date, Reading Time) */}
            <div className="mb-8 flex flex-wrap items-center gap-y-3 gap-x-6 border-b border-stroke pb-6 text-sm text-titlebgdark dark:border-strokedark dark:text-waterloo">
                <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 fill-current text-primary" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span>
                        Oleh: <strong className="font-semibold text-black dark:text-white">Admin</strong>
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 fill-current text-primary" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span>{formattedDate}</span>
                </div>

                <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 fill-current text-primary" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span>{readingTime} menit baca</span>
                </div>
            </div>

            {/* Thumbnail Image */}
            {article.thumbnail && (
                <div className="mb-8 w-full overflow-hidden rounded-xl border border-stroke bg-gray-50 dark:border-strokedark dark:bg-gray-900">
                    <div className="relative aspect-16/9 w-full sm:aspect-97/44">
                        <Image
                            src={article.thumbnail}
                            alt={article.title}
                            fill
                            className="rounded-xl object-cover object-center"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 850px"
                        />
                    </div>
                </div>
            )}

            {/* Content Body */}
            <div
                className="article-details"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}
            />

            {/* Share Post Section */}
            <SharePost
                title={article.title}
                slug={article.slug}
                category={article.category?.name}
            />
        </article>
    );
};

export default ArticleDetail;
