"use client";
import { motion } from "framer-motion";
import SingleBrand from "./SingleBrand";
import brandData from "./brandData";

const Brands = () => {
  const duplicateData = [...brandData, ...brandData]
  return (
    <>
      {/* <!-- ===== Clients Start ===== --> */}
      <section className="border border-x-0 border-y-stroke bg-alabaster py-11 dark:border-y-strokedark dark:bg-black overflow-hidden">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <motion.div
            className="flex w-max items-center gap-12 lg:gap-20"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 20,
              repeat: Infinity
            }}
          >
            {duplicateData.map((brand, key) => (
              <SingleBrand brand={brand} key={key} />
            ))}
          </motion.div>
        </div>
      </section>
      {/* <!-- ===== Clients End ===== --> */}
    </>
  );
};

export default Brands;
