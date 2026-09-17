"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import ThemeToggler from "./ThemeToggler";
import NavigationMenu from "./NavigationMenu";
import NavbarActionButton from "./NavbarActionButton";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 70) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
  });

  return (
    <header
      className={`fixed left-0 top-0 z-99999 w-full py-7 ${stickyMenu
        ? "bg-white py-4! shadow-sm transition duration-100 dark:bg-black"
        : ""
        }`}
    >
      <div className="relative mx-auto max-w-c-1390 items-center justify-between px-4 md:px-8 xl:flex 2xl:px-0">
        <div className="flex w-full items-center justify-between xl:w-1/4 mr-5">
          <a href="/">
            <Image
              src="/images/logo/logo-banner.png"
              alt="logo"
              width={130.03}
              height={30}
              className="h-10 w-auto dark:hidden"
            />
            <Image
              src="/images/logo/logo-banner-dark.png"
              alt="logo"
              width={130.03}
              height={30}
              className="hidden h-10 w-full dark:block"
            />
          </a>

          <div className="flex items-center gap-4 xl:hidden">
            <ThemeToggler />
            {/* <!-- Hamburger Toggle BTN --> */}
            <button
              aria-label="hamburger Toggler"
              className="block xl:hidden"
              onClick={() => setNavigationOpen(!navigationOpen)}
            >
              <span className="relative block h-5.5 w-5.5 cursor-pointer">
                <span className="absolute right-0 block h-full w-full">
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-0 duration-200 ease-in-out dark:bg-white ${!navigationOpen ? "w-full! delay-300" : "w-0"
                      }`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${!navigationOpen ? "delay-400 w-full!" : "w-0"
                      }`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${!navigationOpen ? "w-full! delay-500" : "w-0"
                      }`}
                  ></span>
                </span>
                <span className="du-block absolute right-0 h-full w-full rotate-45">
                  <span
                    className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${!navigationOpen ? "h-0! delay-0" : "h-full"
                      }`}
                  ></span>
                  <span
                    className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${!navigationOpen ? "h-0! delay-200" : "h-0.5"
                      }`}
                  ></span>
                </span>
              </span>
            </button>
            {/* <!-- Hamburger Toggle BTN --> */}
          </div>
        </div>

        {/* Nav Menu Start   */}
        <div
          className={`invisible h-0 w-full items-center justify-between xl:visible xl:flex xl:h-auto xl:w-full ${navigationOpen &&
            "navbar visible! mt-4 h-auto max-h-[400px] rounded-md bg-white p-7.5 shadow-solid-5 dark:bg-blacksection xl:h-auto xl:p-0 xl:shadow-none xl:dark:bg-transparent"
            }`}
        >
          <NavigationMenu />
          <div className="mt-7 flex items-center gap-6 xl:mt-0">
            <div className="hidden xl:block">
              <ThemeToggler />
            </div>
            <NavbarActionButton />
          </div>
        </div>
      </div>
    </header>
  );
};

// w-full delay-300

export default Header;
