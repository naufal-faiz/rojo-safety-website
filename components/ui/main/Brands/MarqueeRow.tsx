"use client"

import { motion } from "framer-motion";
import { Brand } from "./brandData";
import SingleBrand from "./SingleBrand";

const MarqueeRow = ({
    data,
    direction = "left",
    duration = 12,
    className = "",
}: {
    data: Brand[];
    direction?: "left" | "right";
    duration?: number;
    className?: string;
}) => {
    const items = [...data, ...data];
    return (
        <motion.div
            className={`flex w-max items-center gap-10 lg:gap-16 ${className}`}
            animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
            transition={{ ease: "linear", duration, repeat: Infinity }}
        >
            {items.map((brand, key) => (
                <SingleBrand brand={brand} key={key} />
            ))}
        </motion.div>
    );
};

export default MarqueeRow