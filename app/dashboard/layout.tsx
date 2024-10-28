'use client'

import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import Header from '@/components/parts/Header';
import Breadcrumbs from "@/components/parts/Breadcrumbs";
import { ThemeProvider } from "@/provider/theme-provider";
import "./../globals.css";
import { Toaster } from "@/components/ui/toaster"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSideBar } from "@/components/parts/AppSideBar";
import { useState, useEffect } from 'react';

const metadata: Metadata = {
  title: "Crowd Monitoring System",
  description: "Artificial Intelligence Driven Crowd Monitoring System",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <SidebarProvider>
      <AppSideBar />
      <main className="w-full h-full overflow-y-auto">
        <Header />
        <div className="p-4">
          <Breadcrumbs />
          {children}
        </div>
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
