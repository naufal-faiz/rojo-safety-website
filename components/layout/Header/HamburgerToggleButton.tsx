import React, { useState } from 'react'

const HamburgerToggleButton = () => {
    const [navigationOpen, setNavigationOpen] = useState(false);

    return (
        <>
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
        </>
    )
}

export default HamburgerToggleButton
