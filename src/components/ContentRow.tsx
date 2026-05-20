"use client"

import { useRef } from "react"
import MovieCard from "./MovieCard"

interface Props {
  title: string
  items: any[]
  link?: string
}

export default function ContentRow({ title, items, link }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const scroll = (dir: "left" | "right") => {
    if (!ref.current) return
    const amount = 600
    ref.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" })
  }

  return (
    <section className="section content-row">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        {link && <a href={link} className="section-link">View All</a>}
      </div>
      <div style={{ position: "relative" }}>
        <button className="row-btn row-btn-left" onClick={() => scroll("left")}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="row-scroll" ref={ref}>
          {items.map((item: any) => (
            <MovieCard key={item.id} item={item} />
          ))}
        </div>
        <button className="row-btn row-btn-right" onClick={() => scroll("right")}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  )
}
