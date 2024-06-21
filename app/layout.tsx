import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


// app components
import Navbar from '../components/Navbar';
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crowd Monitoring System",
  description: "Artificial Intelligence driven crowd monitoring system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <Sidebar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
