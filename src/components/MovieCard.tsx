"use client"

import Link from "next/link"
import { getImageUrl } from "@/lib/tmdb"

interface Props {
  id: number
  title: string
  poster: string | null
  rating: number
  year: string
  mediaType: "movie" | "tv"
}

export default function MovieCard({ id, title, poster, rating, year, mediaType }: Props) {
  const href = mediaType === "movie" ? `/movie/${id}` : `/tv/${id}`
  const imgSrc = getImageUrl(poster, "w342")

  return (
    <Link href={href} className="group flex-shrink-0 w-[160px] sm:w-[180px] snap-start">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-zinc-800 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-[#e50914]/10 group-hover:z-10">
        {imgSrc ? (
          <img src={imgSrc} alt={title} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-600 p-4">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-yellow-400">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {rating.toFixed(1)}
            </span>
            {year && <span className="text-zinc-300">{year}</span>}
          </div>
        </div>
        <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#e50914] text-white text-[10px] font-bold uppercase rounded">
          {mediaType}
        </div>
      </div>
      <p className="mt-2 text-sm text-zinc-400 truncate group-hover:text-white transition-colors">{title}</p>
    </Link>
  )
}
