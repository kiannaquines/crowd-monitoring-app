import { GeistSans } from "geist/font/sans"
import { ThemeProvider } from "@/provider/theme-provider";
import Sidebar from "@/components/parts/Sidebar";
import Header from "@/components/parts/Header";
import Breadcrumbs from "@/components/parts/Breadcrumbs";
import "./profile.css";

export const metadata = {
  title: 'User Profile',
  description: 'Crowd Monitoring Software User Profile',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} flex items-start justify-between`}>
        <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange>
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
  )
}
