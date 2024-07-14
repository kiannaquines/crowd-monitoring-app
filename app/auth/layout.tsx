import React from "react";

export default function AuthLayout({children,}: {children: React.ReactNode}) {
    return (
        <body>
            <header>This is the auth layout header</header>
            {children}
        </body>
    )
}