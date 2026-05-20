"use client"

import { useRef } from "react"
import MovieCard from "./MovieCard"

interface Item {
  id: number
  title: string
  poster_path: string | null
  vote_average: number
  release_date?: string
  first_air_date?: string
  media_type?: string
  name?: string
}

interface Props {
  title: string
  items: Item[]
}

export default function ContentRow({ title, items }: Props) {
  const rowRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  if (!items.length) return null

  const scroll = (dir: "left" | "right") => {
    if (!rowRef.current) return
    const amount = rowRef.current.clientWidth * 0.6
    rowRef.current.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    startX.current = e.pageX - rowRef.current!.offsetLeft
    scrollLeft.current = rowRef.current!.scrollLeft
  }

  const handleMouseUp = () => { isDragging.current = false }
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    e.preventDefault()
    const x = e.pageX - rowRef.current!.offsetLeft
    const walk = (x - startX.current) * 1.5
    rowRef.current!.scrollLeft = scrollLeft.current - walk
  }

  return (
    <section className="relative mb-8 group/row">
      <div className="flex items-center gap-3 mb-3 px-6">
        <h2 className="text-lg font-bold text-white">{title}</h2>
      </div>
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-r from-[#0a0a0a] to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-start pl-2 cursor-pointer"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div
          ref={rowRef}
          className="flex gap-2 overflow-x-auto px-6 pb-2 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {items.map((item) => (
            <MovieCard
              key={item.id}
              id={item.id}
              title={item.title || item.name || ""}
              poster={item.poster_path}
              rating={item.vote_average || 0}
              year={(item.release_date || item.first_air_date || "").split("-")[0]}
              mediaType={(item.media_type as "movie" | "tv") || (item.title ? "movie" : "tv")}
            />
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-l from-[#0a0a0a] to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-end pr-2 cursor-pointer"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  )
}
