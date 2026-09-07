"use client";
import Image from "next/image";
import SectionHeader from "../../Common/SectionHeader";
import TrainingItem from "./TrainingItem";
import trainingData from "./trainingScheduleData";
import { motion } from "framer-motion";
import Link from "next/link";

const Training = () => {
    return (
        <>
            {/* <!-- ===== Training Schedule Table Start ===== --> */}
            <section className="overflow-hidden pb-20 pt-5 lg:pb-25 xl:pb-30">
                <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
                    {/* <!-- Section Title Start --> */}
                    <div className="animate_top mx-auto text-center">
                        <SectionHeader
                            headerInfo={{
                                title: `TRAINING TERBARU`,
                                subtitle: `Jadwal Kegiatan Terbaru Yang Akan Segera Dilaksanakan`,
                                description: `Temukan kegiatan training sesuai minat dan kemampuan anda bersama kami`,
                            }}
                        />
                    </div>
                    {/* <!-- Section Title End --> */}
                </div>

                <div className="relative mx-auto mt-15 max-w-[1207px] px-4 md:px-8 xl:mt-20 xl:px-0">
                    <div className="absolute -bottom-15 -z-1 h-full w-full">
                        <Image
                            fill
                            src="./images/shape/shape-dotted-light.svg"
                            alt="Dotted"
                            className="dark:hidden"
                        />
                    </div>
                    <div className="flex flex-wrap justify-center gap-7.5 lg:flex-nowrap xl:gap-12.5">
                        {/* <!-- Training Schedule Item --> */}
                        {trainingData.slice(0, 3).map((training, key) => (
                                <TrainingItem training={training} key={key}/>
                        ))}
                    </div>

                    <div className="flex items-center justify-center mx-auto mt-10 max-w-[1207px] px-4 md:px-8 xl:mt-10 xl:px-0">
                        <Link
                            aria-label="Lihat Jadwal Training"
                            className="group/btn inline-flex items-center gap-2.5 font-medium text-primary transition-all duration-300 dark:text-white dark:hover:text-primary"
                            href={"/training"}
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
            {/* <!-- ===== Training Schedule Table End ===== --> */}
        </>
    );
};

export default Training;
