"use client"

import { useEffect, useCallback } from "react"
import Sidebar from "@/components/Sidebar"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const t = localStorage.getItem("jf_theme")
    if (t === "light") document.body.classList.add("light")

    const handleScroll = () => {
      const btn = document.getElementById("scrollTopBtn")
      if (btn) btn.classList.toggle("visible", window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = useCallback(() => {
    document.body.classList.toggle("light")
    localStorage.setItem("jf_theme", document.body.classList.contains("light") ? "light" : "dark")
  }, [])

  return (
    <>
      <Sidebar />
      <main className="main-content" id="mainContent">
        {children}
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">&#9788;</button>
      </main>
      <button className="scroll-top" id="scrollTopBtn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>&#8593;</button>
    </>
  )
}
