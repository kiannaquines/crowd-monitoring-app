import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';

import "./globals.css";


// app components
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Breadcrumbs from "@/components/Breadcrumbs";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Crowd Monitoring System",
  description: "Artificial Intelligence Driven Crowd Monitoring System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <ThemeProvider
       attribute="class"
       defaultTheme="system"
       enableSystem
       disableTransitionOnChange
      >
        <body className={`${GeistSans.className} flex items-start justify-between`}>
          <div className="min-w-[300px] min-h-[1100px]">
            <Sidebar/>
          </div>
          <main className="w-full h-full overflow-y-auto">
            <Header/>
            <div className="p-4">
              <Breadcrumbs/>
              {children}
            </div>
          </main>
        </body>
      </ThemeProvider>
    </html>
  );
}
