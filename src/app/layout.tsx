import type { Metadata } from "next"
import "./globals.css"
import Sidebar from "@/components/Sidebar"

export const metadata: Metadata = {
  title: "JessFlix - Watch Movies & TV Shows",
  description: "Stream your favorite movies and TV shows in HD quality",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 lg:ml-0 min-h-screen overflow-hidden">{children}</main>
        </div>
      </body>
    </html>
  )
}
