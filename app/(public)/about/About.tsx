"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const About = () => {
    return (
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
            className="animate_top article-details article-details-docs shadow-three dark:bg-gray-dark rounded-xs bg-white px-8 py-11 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
            <h1 className="text-center">Sejarah Perusahaan</h1>

            <div className="relative mx-auto my-7.5 aspect-video w-5/6">
            <Image src="/images/article/about-rojo.jpg"
                alt="Sejarah Perusahaan PT. Wina Karya Mulia - Rojo Safety"
                className="rounded-md object-cover"
                fill
            />
            </div>

            <p className="text-body-color text-justify dark:text-body-color-dark text-base">
                PT. Wina Karya Mulia berdiri dengan tekad untuk berpartisipasi aktif dalam menciptakan lingkungan kerja yang aman, sehat, dan produktif. Sejak awal berdirinya, perusahaan kami telah berkomitmen untuk mendukung pengembangan sumber daya manusia, memenuhi kebutuhan keselamatan kerja dan lingkungan di berbagai industri.
                <br /> <br />

                Berawal dari langkah kecil tanpa berbadan hukum pada tahun 2015, kami berkembang menjadi perusahaan resmi berbadan hukum pada tahun 2016. Seiring dengan pertumbuhan tersebut, kami terus memperluas layanan kami yang mencakup pelatihan, konsultasi K3, riksa uji peralatan, sertifikasi tenaga kerja, dan pengukuran lingkungan kerja.
                <br /> <br />
                Dengan visi untuk menjadi perusahaan K3 dan lingkungan terdepan di tingkat nasional, kami selalu mengedepankan inovasi, profesionalisme, dan tata kelola yang transparan. Kami percaya bahwa keselamatan kerja bukan hanya sebuah kewajiban, tetapi juga investasi untuk keberlanjutan dan keberhasilan jangka panjang.
                <br /> <br />
                Hingga saat ini PT. Wina Karya Mulia telah menjadi mitra terpercaya bagi berbagai industri, berkat layanan yang berstandar nasional dan dedikasi kami untuk memberikan solusi terbaik di bidang keselamatan dan kesehatan kerja. Kami terus bergerak maju dengan misi untuk memberikan layanan berkualitas dan berkontribusi positif bagi masyarakat luas
            </p>
            <h3>Visi Kami</h3>
            <p className="text-body-color dark:text-body-color-dark text-base">
                Menjadi perusahaan K3 dan Lingkungan terdepan yang diakui secara nasional dalam bidang pengembangan sumber daya manusia serta memberikan kontribusi positif bagi masyarakat luas dan berkomitmen untuk terus meningkatkan kualitas layanan terbaik dengan tata kelola perusahaan yang transparan, etis, serta profesional.
            </p>
            <h3>Misi Kami</h3>
            <ul>
                <li>Menghilangkan kesenjangan pengetahuan, ketrampilan serta sikap kerja guna memenuhi tuntutan kinerja.</li>
                <li>Memfasilitasi beragam aktivitas dalam usaha pengembangan sumber daya manusia dalam mencapai tujuan organisasi.</li>
                <li>Memberikan totalitas pelayanan kepada pelanggan dalam meningkatkan kinerja, daya saing dan pembelajaran organisasi.</li>
            </ul>
        </motion.div>
    )
}

export default About
