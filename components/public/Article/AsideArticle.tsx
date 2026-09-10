import Image from "next/image";
import Link from "next/link";
import { getPublishedArticles } from "@/lib/data/article/article";

type postCategoryProps = {
  title: string
  typeFilter: string
}

const AsideArticle = async ({ title, typeFilter }: postCategoryProps) => {
  const articles = await getPublishedArticles({ categoryName: typeFilter, take: 3 })
  return (
    <>
      <div className="animate_top rounded-md border border-stroke bg-white p-9 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
        <h4 className="mb-7.5 text-2xl font-semibold text-black dark:text-white">
          {title}
        </h4>

        <div>
          {articles.map((article) => (
            <div
              className="mb-7.5 flex flex-wrap gap-4 xl:flex-nowrap 2xl:gap-6"
              key={article.id}
            >
              <div className="max-w-45 relative h-18 w-45">
                {article.thumbnail ? (
                  <Image fill src={article.thumbnail} alt={article.title} />
                ) : (
                  "No image"
                )}
              </div>
              <h5 className="text-md font-medium text-black transition-all duration-300 hover:text-primary dark:text-white dark:hover:text-primary">
                <Link href={`/artikel/${article.slug}`}>
                  {" "}
                  {article.title.slice(0, 40)}...
                </Link>
              </h5>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AsideArticle;
