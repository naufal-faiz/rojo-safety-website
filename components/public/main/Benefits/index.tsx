"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SingleBenefit from "./SingleBenefit";
import benefitData from "./benefitsData";

const Benefits = () => {
    return (
        <>
            <section className="overflow-hidden pb-20 lg:pb-25 xl:pb-30">
                <div className="mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
                    <div className="flex items-center gap-8 lg:gap-32.5">
                        <motion.div
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    x: -20,
                                },

                                visible: {
                                    opacity: 1,
                                    x: 0,
                                },
                            }}
                            initial="hidden"
                            whileInView="visible"
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="animate_left relative mx-auto hidden aspect-[588/526.5] md:block md:w-1/2"
                        >
                            <Image
                                src="/images/benefit/benefit.png"
                                alt="Benefits"
                                className="dark:hidden"
                                fill
                            />
                            <Image
                                src="/images/benefit/benefit.png"
                                alt="Benefits"
                                className="hidden dark:block"
                                fill
                            />
                        </motion.div>
                        <motion.div
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    x: 20,
                                },

                                visible: {
                                    opacity: 1,
                                    x: 0,
                                },
                            }}
                            initial="hidden"
                            whileInView="visible"
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="animate_right md:w-1/2"
                        >

                            <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                                Keuntungan Mengikuti Pelatihan di{" "}
                                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark">
                                    Rojo Safety
                                </span>
                            </h2>
                            <p>
                                Rojo Safety memiliki keunggulan dengan izin resmi dari SK Menakertrans RI No. SKP. 543/BINWASK3 PNK3/PJK3/IX/2016. Nikmati pengalaman pelatihan terbaik dengan :
                            </p>
                            {benefitData.map((benefit) => (
                                <SingleBenefit benefit={benefit} key={benefit.id} />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Benefits;
