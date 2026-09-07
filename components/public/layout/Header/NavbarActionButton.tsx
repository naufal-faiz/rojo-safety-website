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
                href="/training/formulir"
                className="flex items-center justify-center rounded-full bg-primary px-7.5 py-2.5 text-regular text-white hover:bg-primaryho"
            >
                Daftar
            </Link>
        </>
    )
}

export default NavbarActionButton
