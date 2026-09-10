"use client";
import { Article } from "@/lib/generated/prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";

const ArticleItem = ({ article }: { article: Article }) => {
  const { title, slug, thumbnail, excerpt } = article;

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
        href={`/artikel/${slug}`}
      >
        <div className="relative block aspect-368/239">
          <Image src={thumbnail!} alt={title} fill />
        </div>

        <div className="px-4">
          <h3 className="mb-3.5 mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">
            {`${title.length >= 35 ? title.slice(0, 35) + "..." : title}`}
          </h3>
          <p className="line-clamp-3">{excerpt}...</p>
        </div>
      </motion.a>
    </>
  );
};

export default ArticleItem;
