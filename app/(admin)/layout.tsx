import { SidebarProvider } from '@/lib/context/SidebarContext';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Rojo Safety - Dashboard Admin",
  description: "Rojo Safety Penyedia Jasa Kesehatan, Keselamatan Kerja di Bekasi",
  icons: {
    icon: "/images/favicon.ico"
  }
};

export default function AdminLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return <SidebarProvider>{children}</SidebarProvider>;
}

