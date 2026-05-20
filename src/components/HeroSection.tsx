"use client"

import Link from "next/link"
import { getBackdropUrl, getImageUrl } from "@/lib/tmdb"

interface Props {
  item: {
    id: number
    title?: string
    name?: string
    overview: string
    backdrop_path: string | null
    poster_path: string | null
    vote_average: number
    release_date?: string
    first_air_date?: string
    media_type?: string
  }
}

export default function HeroSection({ item }: Props) {
  const id = item.id
  const title = item.title || item.name || ""
  const backdrop = getBackdropUrl(item.backdrop_path)
  const poster = getImageUrl(item.poster_path, "w185")
  const mediaType = item.media_type || (item.title ? "movie" : "tv")
  const href = mediaType === "movie" ? `/movie/${id}` : `/tv/${id}`
  const year = (item.release_date || item.first_air_date || "").split("-")[0]
  const overview = item.overview?.length > 200 ? item.overview.slice(0, 200) + "..." : item.overview

  if (!backdrop) return null

  return (
    <section className="relative w-full h-[85vh] min-h-[600px]">
      <div className="absolute inset-0">
        <img src={backdrop} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-gradient" />
      </div>
      <div className="relative z-10 h-full flex items-end pb-24 px-6 lg:px-16">
        <div className="flex gap-8 items-end max-w-5xl">
          {poster && (
            <div className="hidden md:block w-[180px] flex-shrink-0 rounded-lg overflow-hidden shadow-2xl shadow-black/50 -mb-16">
              <img src={poster} alt={title} className="w-full aspect-[2/3] object-cover" />
            </div>
          )}
          <div className="flex flex-col gap-4 max-w-2xl">
            <h1 className="text-5xl sm:text-6xl font-bold text-white droping-3 tracking-tight">
              {title}
            </h1>
            <div className="flex items-center gap-3 text-sm">
              {year && <span className="text-zinc-400">{year}</span>}
              <span className="flex items-center gap-1 text-yellow-400 font-medium">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {item.vote_average?.toFixed(1)}
              </span>
            </div>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed line-clamp-3">{overview}</p>
            <div className="flex gap-3 mt-2">
              <Link
                href={href}
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#e50914] hover:bg-[#f40612] text-white rounded-lg font-bold text-sm transition-all hover:scale-105 active:scale-95"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
