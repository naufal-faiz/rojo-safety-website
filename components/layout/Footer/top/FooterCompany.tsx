import { motion } from 'framer-motion'
import Image from 'next/image'

const FooterCompany = () => {
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
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="animate_top lg:w-1/4"
            >
                <a href="/" className="relative">
                    <div className="flex items-center gap-2">
                        <div>
                            <Image
                                width={50}
                                height={50}
                                src="/images/logo/logo-image.png"
                                alt="Logo"
                                className="dark:hidden"
                            />
                            <Image
                                width={50}
                                height={50}
                                src="/images/logo/logo-image.png"
                                alt="Logo"
                                className="hidden dark:block"
                            />
                        </div>
                        <div className="footer-logo-title">
                            <p className="font-bold text-primary text-3xl">ROJO SAFETY</p>
                        </div>
                    </div>
                </a>

                <p className="mb-10 mt-5">
                    Kami adalah salah satu perusahaan dalam negeri yang bergerak dibidang layanan jasa pelatihan dan konsultasi manajemen.
                </p>

                {/* Google Maps */}
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d513.0260864633406!2d106.98483762634412!3d-6.186784896254256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698c3046cd2f17%3A0xfc9798babb5dd7c7!2sROJO%20SAFETY!5e1!3m2!1sid!2sid!4v1788260102087!5m2!1sid!2sid"
                    width="330"
                    height="230"
                    style={{ borderRadius: 10 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                />
            </motion.div>
        </>
    )
}

export default FooterCompany
