"use client"
import { Training } from "@/types/training/training"
import { motion } from "framer-motion"
import Link from "next/link"

const TrainingItem = ({ training }: { training: Training }) => {
    const { trainingTitle, description, slug } = training
    return (
        <>
            <motion.div
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
                className="animate_top rounded-lg bg-white p-2 shadow-solid-8 dark:bg-blacksection"
            >
                    <img className="rounded-lg" src="/images/hero/hero-image.jpg" alt="" />
                    <div className="p-6 text-center">
                        <h5 className="mt-3 mb-2 text-2xl font-semibold tracking-tight text-black dark:text-white ">{trainingTitle}</h5>
                        <p className="mb-6 dark:text-white">{description.slice(0,40)}...</p>
                        <Link href={`/training/formulir/${slug}`} className="flex rounded-md justify-center mb-3 bg-primary px-7.5 py-1.5 text-white duration-300 ease-in-out hover:bg-primaryho dark:bg-btndark dark:hover:bg-blackho">
                            <span className="duration-300 group-hover/btn:pr-2">
                                Daftar
                            </span>
                        </Link>
                        <Link
                            href={`/artikel/${slug}`}
                            className="group/btn inline-flex items-center gap-2.5 font-medium text-primary transition-all duration-300 dark:text-white dark:hover:text-primary"
                        >
                            <span className="duration-300 group-hover/btn:pr-2">
                                Lihat Detail
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
                </motion.div>
        </>
    )
}

export default TrainingItem
