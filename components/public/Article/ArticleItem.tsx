"use client";
import { Article } from "@/types/article/article";
import { motion } from "framer-motion";
import Image from "next/image";

const ArticleItem = ({ article }: { article: Article }) => {
  const { mainImage, title, metadata } = article;

  return (
    <>
      <motion.a
        variants={{
          hidden: {
            opacity: 0,
            y: -20,
          },

          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
        className="animate_top rounded-lg bg-white p-4 pb-9 shadow-solid-8 dark:bg-blacksection"
        href={`/artikel/article-details`}
      >
        <div className="relative block aspect-368/239">
          <Image src={mainImage} alt={title} fill />
        </div>

        <div className="px-4">
          <h3 className="mb-3.5 mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">
              {`${title.slice(0, 40)}...`}
          </h3>
          <p className="line-clamp-3">{metadata}</p>
        </div>
      </motion.a>
    </>
  );
};

export default ArticleItem;
