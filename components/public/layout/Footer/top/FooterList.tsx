import { motion } from "framer-motion";

type FooterListProps = {
    title: string,
    items: string[]
    url: string
}

const FooterList = ({ title, items, url }: FooterListProps) => {
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
                <h4 className="mb-9 text-itemtitle2 font-medium text-black dark:text-white">
                    {title}
                </h4>
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>
                            <a
                                href={url}
                                className="mb-3 inline-block hover:text-primary"
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </>
    )
}

export default FooterList
