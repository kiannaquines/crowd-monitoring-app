import React from "react";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/provider/theme-provider";
import './auth.css';
import { Toaster } from "@/components/ui/toaster"

export default function AuthLayout({ children, }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${GeistSans.className}`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange>
                        <main className="w-100 justify-center max-h-full content-center">
                            {children}
                        </main>
                        <Toaster />
                </ThemeProvider>
            </body>
        </html>
    )
}