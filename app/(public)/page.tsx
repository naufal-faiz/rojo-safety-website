import {
  Benefits,
  Brands,
  CompanyService,
  FAQ,
  FunFact,
  Hero,
  Testimonial,
  WhyChooseUs,
  Training,
  Article
} from "@/components/ui/main"

function Home() {
  return (
    <main>
      <Hero />
      <Brands />
      <CompanyService />
      <Benefits />
      <WhyChooseUs />
      <FunFact />
      <Training />
      <FAQ />
      <Testimonial />
      <Article />
    </main>
  )
}

export default Home
