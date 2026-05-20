"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const path = usePathname()
  const route = path === "/" ? "home" : path.split("/")[1] || "home"

  return (
    <aside className="sidebar" id="sidebar">
      <Link href="/" className="logo-wrap">
        <svg className="logo-icon" viewBox="0 0 40 40" fill="none">
          <defs>
            <linearGradient id="lg" x1="0" y1="0" x2="40" y2="40">
              <stop offset="0%" stopColor="#f5c518" /><stop offset="100%" stopColor="#e69500" />
            </linearGradient>
          </defs>
          <rect x="2" y="2" width="36" height="36" rx="10" fill="url(#lg)" />
          <polygon points="16,12 28,20 16,28" fill="#0a0a16" />
          <path d="M28 12h3v16h-3z" fill="#0a0a16" />
          <path d="M6 30C6 26.5 8.5 24 12 24h4v6H6z" fill="#fff" opacity="0.9" />
          <circle cx="33" cy="7" r="6" fill="#f5c518" />
          <text x="33" y="9" textAnchor="middle" fill="#0a0a16" fontSize="7" fontWeight="bold">&#9733;</text>
        </svg>
        <span className="logo-text">JessFlix</span>
      </Link>

      <div className="nav-items">
        <Link href="/" className={`nav-item ${route === "home" ? "active" : ""}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span className="label">Home</span>
        </Link>

        <Link href="/search" className={`nav-item ${route === "search" ? "active" : ""}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <span className="label">Search</span>
        </Link>

        <Link href="/movies" className={`nav-item ${route === "movies" ? "active" : ""}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/><line x1="17" y1="17" x2="22" y2="17"/></svg>
          <span className="label">Movies</span>
        </Link>

        <Link href="/tv" className={`nav-item ${route === "tv" ? "active" : ""}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17,2 12,7 7,2"/></svg>
          <span className="label">TV Shows</span>
        </Link>

        <Link href="/library" className={`nav-item ${route === "library" ? "active" : ""}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
          <span className="label">Library</span>
        </Link>
      </div>
    </aside>
  )
}
