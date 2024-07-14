import React from "react";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/provider/theme-provider";

export default function AuthLayout({ children, }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${GeistSans.className}`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange>
                        <main className="w-full h-full overflow-y-auto">
                            {children}
                        </main>
                </ThemeProvider>
            </body>
        </html>
    )
}