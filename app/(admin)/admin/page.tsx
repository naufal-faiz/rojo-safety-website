import Image from "next/image";

export default function Ecommerce() {
  return (
    <>
    <div className="p-6 bg-white shadow-solid-10 rounded-2xl dark:bg-black mb-">
      <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
        <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
          <Image
            width={80}
            height={80}
            src="/images/user/user-01.png"
            alt="user"
          />
        </div>
        <div className="order-3 xl:order-2">
          <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
            Selamat Datang, Nopaleon 🖐️
          </h4>
          <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Team Manager
            </p>
            <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Arizona, United States
            </p>
          </div>
        </div>
      </div>
    </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          Nopal
        </div>

        <div className="col-span-12 xl:col-span-5">
          Ratna
        </div>

        <div className="col-span-12">
          Asep
        </div>

        <div className="col-span-12 xl:col-span-5">
        </div>

        <div className="col-span-12 xl:col-span-7">
        </div>
      </div>
    </>
  );
}
