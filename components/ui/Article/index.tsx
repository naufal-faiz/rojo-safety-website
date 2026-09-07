import Link from "next/link";
import SectionHeader from "../Common/SectionHeader";
import ArticleItem from "./ArticleItem";
import ArticleData from "./articleData";

const Article = async () => {
  return (
    <section className="py-20 lg:py-25 xl:pt-10 xl:pb-30">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        {/* <!-- Section Title Start --> */}
        <div className="animate_top mx-auto text-center">
          <SectionHeader
            headerInfo={{
              title: `BERITA`,
              subtitle: `Berita & Artikel Terbaru`,
              description: `Dapatkan kabar terbaru mengenai kegiatan training maupun lainnya dari kami`,
            }}
          />
        </div>
        {/* <!-- Section Title End --> */}
      </div>

      <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
        <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {ArticleData.filter((article) => article.type === "berita").slice(0, 3).map((article, key) => (
            <ArticleItem article={article} key={key} />
          ))}
        </div>
        <div className="flex items-center justify-center mx-auto mt-10 max-w-[1207px] px-4 md:px-8 xl:mt-10 xl:px-0">
          <Link
            aria-label="Lihat Lainnya"
            className="group/btn inline-flex items-center gap-2.5 font-medium text-primary transition-all duration-300 dark:text-white dark:hover:text-primary"
            href={"/artikel"}
          >
            <span className="duration-300 group-hover/btn:pr-2">
              Lebih Banyak
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z"
                fill="currentColor"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Article;
