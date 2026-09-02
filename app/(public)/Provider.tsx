"use client";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Lines from "@/components/layout/Lines";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { ThemeProvider } from "next-themes";
import ToasterContext from "../context/ToastContext";

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
