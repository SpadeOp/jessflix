import type { Metadata } from "next"
import "./globals.css"
import ClientLayout from "@/components/ClientLayout"

export const metadata: Metadata = {
  title: "JessFlix - Stream Movies & TV Shows",
  description: "Watch free movies and TV shows online",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
