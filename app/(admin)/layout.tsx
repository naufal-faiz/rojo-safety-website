import { Metadata } from 'next';
import Provider from "./Provider"

export const metadata: Metadata = {
  title: "Rojo Safety - Penyedia Jasa K3",
  description: "Rojo Safety Penyedia Jasa Kesehatan, Keselamatan Kerja di Bekasi",
  icons: {
    icon: "/images/favicon.ico"
  }
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <>
      <Provider>
        {children}  
      </Provider>
    </>
  )
}

export default RootLayout
