"use client"

import { useRef } from "react"
import MovieCard from "./MovieCard"
import type { Movie, TVShow } from "@/types"

interface Props {
  title: string
  items: (Movie | TVShow)[]
}

export default function ContentRow({ title, items }: Props) {
  const rowRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: "left" | "right") => {
    if (!rowRef.current) return
    const amount = rowRef.current.clientWidth * 0.75
    rowRef.current.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" })
  }

  return (
    <section className="relative mb-8">
      <div className="flex items-center gap-3 mb-4 px-6">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
            aria-label="Scroll left"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
            aria-label="Scroll right"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <div
        ref={rowRef}
        className="flex gap-3 overflow-x-auto px-6 pb-2 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item) => (
          <MovieCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
