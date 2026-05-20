"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { imgOriginal } from "@/lib/tmdb"
import { fallbackMovies } from "@/lib/data"

interface HeroItem {
  id: number
  title?: string
  name?: string
  overview?: string
  backdrop_path?: string
  poster_path?: string
  vote_average?: number
  release_date?: string
  media_type?: string
  genre_ids?: number[]
}

export default function HeroSection({ items: propItems }: { items?: HeroItem[] }) {
  const [items, setItems] = useState<HeroItem[]>([])
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (propItems && propItems.length > 0) {
      setItems(propItems.slice(0, 5))
    } else {
      setItems(fallbackMovies.slice(0, 5))
    }
  }, [propItems])

  useEffect(() => {
    if (items.length < 2) return
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % items.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [items.length])

  const goTo = useCallback((i: number) => setCurrent(i), [])

  if (items.length === 0) return null

  const item = items[current]
  const title = item.title || item.name || ""
  const year = (item.release_date || "").slice(0, 4)
  const rating = item.vote_average || 0
  const overview = item.overview || ""
  const backdrop = item.backdrop_path
  const type = item.media_type || (item.title ? "movie" : "tv")
  const href = type === "movie" ? `/movie/${item.id}` : `/tv/${item.id}`
  const watchHref = type === "movie" ? `/movie/${item.id}?watch=1` : `/movie/${item.id}`

  return (
    <section className="hero">
      {items.map((b, i) => (
        <div
          key={b.id}
          className="hero-backdrop"
          style={{
            opacity: i === current ? 1 : 0,
            backgroundImage: b.backdrop_path ? `url(${imgOriginal(b.backdrop_path)})` : "none",
            zIndex: i === current ? 1 : 0,
          }}
        />
      ))}
      <div className="hero-overlay" />
      <div className="hero-overlay-top" />
      <div className="hero-content">
        <div className="hero-badge">Featured</div>
        <h1 className="hero-title">{title}</h1>
        <div className="hero-meta">
          {year && <span>{year}</span>}
          {rating > 0 && (
            <span className="hero-rating">
              <svg fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              {rating.toFixed(1)}
            </span>
          )}
        </div>
        <div className="hero-overview">{overview}</div>
        <div className="hero-actions">
          <Link href={watchHref} className="btn btn-play">
            <svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch Now
          </Link>
          <Link href={href} className="btn btn-outline">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} width="20" height="20">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            More Info
          </Link>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                borderRadius: 4,
                border: "none",
                background: i === current ? "var(--accent)" : "var(--border)",
                cursor: "pointer",
                transition: "var(--transition)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
