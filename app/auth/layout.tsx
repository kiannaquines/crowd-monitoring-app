import React from "react";
import './auth.css';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-100 justify-center max-h-full content-center">
            {children}
        </main>
    );
}
