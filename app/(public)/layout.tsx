import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <>
    <Header />
      {children}
    <Footer />
    </>
  )
}

export default RootLayout
