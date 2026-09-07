import Image from "next/image";
import { Brand } from "@/types/brand";

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { image, href, name, imageLight } = brand;

  return (
    <a href={href} className="relative block h-10 w-[120px] shrink-0">
      <Image
        className="opacity-65 transition-all duration-300 hover:opacity-100 dark:hidden"
        src={image}
        alt={name}
        fill
      />
      <Image
        className="hidden opacity-50 transition-all duration-300 hover:opacity-100 dark:block"
        src={imageLight}
        alt={name}
        fill
      />
    </a>
  );
};

export default SingleBrand;
