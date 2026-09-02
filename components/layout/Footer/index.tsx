"use client"

import FooterBottom from "./bottom/FooterBottom";
import FooterTop from "./top/FooterTop";

const Footer = () => {
  return (
    <>
      <footer className="border-t border-stroke">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <FooterTop />
          <FooterBottom />
        </div>
      </footer>
    </>
  );
};

export default Footer;
