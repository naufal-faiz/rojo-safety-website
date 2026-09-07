"use client"

import { motion } from "framer-motion"
import whyChooseUsData from "./whyChooseUsData"
import CompanyServiceComponent from "../../Common/CompanyServices"

const WhyChooseUs = () => {
    return (
        <>
            <section>
                <div className="mx-auto max-w-c-1235 px-4 md:px-8 2xl:px-0">
                    <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16 xl:gap-24">
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
                            transition={{ duration: 1, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="animate_left md:w-1/2"
                        >
                            <h2 className="relative mb-6 text-3xl font-bold text-black dark:text-white xl:text-hero">
                                Mengapa Memilih Kami?
                            </h2>
                            <p>
                                Kepuasan klien, kualitas, dan rekam jejak kami terbukti sebagai Mitra Terpercaya
                            </p>
                        </motion.div>
                        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:w-2/3 xl:gap-7.5">
                        {(whyChooseUsData.map((data, key) => (
                            <CompanyServiceComponent service={data} key={key}/>
                        )))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default WhyChooseUs
