import { motion } from "framer-motion"

export type SocialIcon = {
    href: string,
    label: string,
    d: string
}

type FooterSocialIconListProps = {
    icons: SocialIcon[]
}

const FooterSocialIconList = ({ icons }: FooterSocialIconListProps) => {
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
                transition={{ duration: 1, delay: 0.1 }}
                viewport={{ once: true }}
                className="animate_top"
            >
                <ul className="flex items-center gap-5">
                    {icons.map((icon) => (
                        <li key={icon.href}>
                            <a href={icon.href} aria-label={icon.label}>
                                <svg
                                    className="fill-[#D1D8E0] transition-all duration-300 hover:fill-primary"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d={icon.d}
                                        fill=""
                                    />
                                </svg>
                            </a>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </>
    )
}

export default FooterSocialIconList
