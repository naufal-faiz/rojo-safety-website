import { motion } from "framer-motion"
import { FunFact } from "./funFactData"

const SingleFunfact = ({ funFact }: { funFact: FunFact }) => {
    const {id, title, description } = funFact
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
            transition={{ duration: 1, delay: id }}
            viewport={{ once: true }}
            className="animate_top text-center"
        >
            <h3 className="mb-2.5 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle3">
                {title}
            </h3>
            <p className="text-lg lg:text-para2">{description}</p>
        </motion.div>
    )
}

export default SingleFunfact
