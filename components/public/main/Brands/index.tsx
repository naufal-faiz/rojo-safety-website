import brandData from "./brandData";
import MarqueeRow from "./MarqueeRow";

const Brands = () => {
  // Pake kalo clientnya udah fix
  // const half = Math.ceil(brandData.length / 2);
  // const groupOne = brandData.slice(0, half);
  // const groupTwo = brandData.slice(half);  
  return (
    <>
      {/* <!-- ===== Clients Start ===== --> */}
      <section className="border border-x-0 border-y-stroke bg-alabaster py-11 dark:border-y-strokedark dark:bg-black">
        <div className="relative mx-auto max-w-c-1390 overflow-hidden px-4 md:px-8 2xl:px-0">
          {/* fade edges kiri & kanan */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-alabaster to-transparent dark:from-black md:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-alabaster to-transparent dark:from-black md:w-28" />

          <div className="flex flex-col gap-8">
            {/* Pake kalo clientnya udah fix */}
            <MarqueeRow data={brandData} direction="left" duration={14} className="scale-100" />
            <MarqueeRow data={brandData} direction="right" duration={18} className="scale-100" />
            {/* <MarqueeRow data={groupOne} direction="left" duration={14} className="scale-100" />
            <MarqueeRow data={groupTwo} direction="right" duration={18} className="scale-100" /> */}
          </div>
        </div>
      </section>
      {/* <!-- ===== Clients End ===== --> */}
    </>
  );
};

export default Brands;
