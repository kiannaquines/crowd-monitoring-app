import React from "react";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/provider/theme-provider";

export default function AuthLayout({ children, }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange>
                <body className={`${GeistSans.className}`}>
                    <main className="w-full h-full overflow-y-auto">
                        {children}
                    </main>
                </body>
            </ThemeProvider>
        </html>
    )
}