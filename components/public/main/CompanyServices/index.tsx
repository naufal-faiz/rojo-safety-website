"use client";
import servicesData from "./servicesData";
import SectionHeader from "../../Common/SectionHeader";
import CompanyServiceComponent from "../../Common/CompanyServices";

const CompanyService = () => {
  return (
    <>
      {/* <!-- ===== Company Service Start ===== --> */}
      <section id="companyService" className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          {/* <!-- Section Title Start --> */}
          <SectionHeader
            headerInfo={{
              title: "LAYANAN KAMI",
              subtitle: "Tingkatkan Standar Keselamatan dan Kesehatan Kerja",
              description: `Hadir sebagai mitra terpercaya dalam mewujudkan lingkungan kerja yang aman, sehat, dan produktif`,
            }}
          />
          {/* <!-- Section Title End --> */}

          <div className="mt-12.5 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:mt-15 lg:grid-cols-3 xl:mt-20 xl:gap-12.5">
            {/* <!-- Company Service item Start --> */}
            {servicesData.map((service, key) => (
              <CompanyServiceComponent service={service} key={key} />
            ))}
            {/* <!-- Company Service item End --> */}
          </div>
        </div>
      </section>

      {/* <!-- ===== Company Service End ===== --> */}
    </>
  );
};

export default CompanyService;
