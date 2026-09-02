import Link from "next/link"

const NavbarActionButton = () => {
    return (
        <>
            <Link
                href="#!"
                className="text-regular font-medium text-waterloo hover:text-primary"
            >
                Hubungi Kami ☎️
            </Link>

            <Link
                href="https://nextjstemplates.com/templates/solid"
                className="flex items-center justify-center rounded-full bg-primary px-7.5 py-2.5 text-regular text-white duration-300 ease-in-out hover:bg-primaryho"
            >
                Daftar Online
            </Link>
        </>
    )
}

export default NavbarActionButton
