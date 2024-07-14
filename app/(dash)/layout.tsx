import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Breadcrumbs from "@/components/Breadcrumbs";
import { ThemeProvider } from "@/provider/theme-provider";
import "./../globals.css";

export const metadata: Metadata = {
  title: "Crowd Monitoring System",
  description: "Artificial Intelligence Driven Crowd Monitoring System",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} flex items-start justify-between`}>
        <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
        >
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
        </ThemeProvider>
      </body>
    </html>
  );
}
