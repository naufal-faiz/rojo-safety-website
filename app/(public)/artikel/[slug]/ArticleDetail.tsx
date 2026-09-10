import SharePost from "@/components/public/Article/SharePost"
import { Prisma } from "@/lib/generated/prisma/client"
import Image from "next/image"
import DOMPurify from "isomorphic-dompurify"

export type ArticleWithCategory = Prisma.ArticleGetPayload<{
    include: { category: true };
}>;

const ArticleDetail = ({ article }: { article: ArticleWithCategory }) => {

    const formattedDate = article.createdAt
        ? new Date(article.createdAt).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        : "-";

    return (
        <div className="animate_top rounded-md border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">
            {article.thumbnail && (
                <div className="mb-10 w-full overflow-hidden">
                    <div className="relative aspect-97/60 w-full sm:aspect-97/44">
                        <Image
                            src={article.thumbnail}
                            alt={article.title}
                            fill
                            className="rounded-md object-cover object-center"
                            priority
                        />
                    </div>
                </div>
            )}
            <h2 className="mb-5 mt-11 text-3xl font-semibold text-black dark:text-white 2xl:text-sectiontitle2">
                {article.title}
            </h2>
            <ul className="mb-9 flex flex-wrap gap-5 2xl:gap-7.5">
                <li>
                    <span className="text-black dark:text-white">Author: </span>{" "}
                    Admin
                </li>
                <li>
                    <span className="text-black dark:text-white">
                        Published On: {formattedDate}
                    </span>{" "}
                </li>
                <li>
                    <span className="text-black dark:text-white">
                        Category:
                    </span>
                    {" "} {article.category.name}
                </li>
            </ul>
            <div className="article-details prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }} />
            <SharePost />
        </div>
    )
}

export default ArticleDetail
