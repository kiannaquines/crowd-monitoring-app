import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';

import "./globals.css";


// app components
import Header from '../components/Header';
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

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
    <html lang="en" className="">
      <body className={`${GeistSans.className} flex items-start justify-between`}>
        <Sidebar/>
        <main className="w-full h-full">
          <Header/>
          {children}
        </main>
      </body>
    </html>
  );
}
