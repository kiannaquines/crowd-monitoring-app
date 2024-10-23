'use client';

import React, { useEffect, useState } from "react";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/provider/theme-provider";
import './auth.css';
import { Toaster } from "@/components/ui/toaster";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const accessToken = Cookies.get("bearer");
    const { push } = useRouter();

    useEffect(() => {
        if (accessToken) {
            push('/dashboard');
        } else {
            setLoading(false);
        }
    }, [accessToken, push]);

    return (
        <html lang="en">
            <body className={`${GeistSans.className}`}>
                <main className="w-100 justify-center max-h-full content-center">
                    {children}
                </main>
                <Toaster />
            </body>
        </html>
    );
}
