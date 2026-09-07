"use client";

import Footer from "@/components/public/layout/Footer";
import Header from "@/components/public/layout/Header";
import Lines from "@/components/public/layout/Lines";
import ScrollToTop from "@/components/public/ScrollToTop";
import { ThemeProvider } from "next-themes";
import ToasterContext from "../../lib/context/ToastContext";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider
            enableSystem={false}
            attribute="class"
            defaultTheme="light"
        >
            <Lines />
            <Header />
            <ToasterContext />
            {children}
            <Footer />
            <ScrollToTop />
        </ThemeProvider>
    );
}
