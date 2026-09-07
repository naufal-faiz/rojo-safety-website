"use client";

import { SidebarProvider } from "@/lib/context/SidebarContext";
import { ThemeProvider } from "next-themes";

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
            <SidebarProvider>
            {children}
            </SidebarProvider>

        </ThemeProvider>
    );
}
