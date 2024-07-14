import React from "react";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/provider/theme-provider";
import './auth.css';

export default function AuthLayout({ children, }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${GeistSans.className}`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange>
                        <main className="w-100 flex justify-center content-center">
                            {children}
                        </main>
                </ThemeProvider>
            </body>
        </html>
    )
}