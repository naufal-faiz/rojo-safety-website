import { Metadata } from "next"
import About from "./About"

export const metadata: Metadata = {
    title: "Tentang Rojosafety - Rojo Safety",
    description: "Sejarah perusahaan, fokus dan jasa yang ditawarkan"
}

const AboutPage = () => {
    return (
        <main>
            <section className="overflow-hidden pb-20 pt-30 md:pt-30 xl:pb-25 xl:pt-30">
                <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
                <About />
                </div>
            </section>
        </main>
    )
}

export default AboutPage
