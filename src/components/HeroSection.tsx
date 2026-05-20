import Link from "next/link"
import type { Movie, TVShow } from "@/types"
import { getBackdropUrl, getImageUrl } from "@/lib/tmdb"

interface Props {
  item: Movie | TVShow
}

export default function HeroSection({ item }: Props) {
  const id = item.id
  const title = "title" in item ? item.title : item.name
  const overview = item.overview
  const backdrop = getBackdropUrl(item.backdrop_path)
  const poster = getImageUrl(item.poster_path, "w185")
  const mediaType = item.media_type || ("title" in item ? "movie" : "tv")
  const href = mediaType === "movie" ? `/movie/${id}` : `/tv/${id}`
  const date = "release_date" in item ? item.release_date : item.first_air_date
  const year = date ? date.split("-")[0] : ""

  return (
    <section className="relative w-full h-[70vh] min-h-[500px] mb-8">
      {backdrop && (
        <div className="absolute inset-0">
          <img src={backdrop} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
        </div>
      )}
      <div className="relative z-10 h-full flex items-end pb-16 px-6">
        <div className="flex gap-6 items-end max-w-5xl">
          {poster && (
            <div className="hidden sm:block w-[150px] flex-shrink-0 rounded-lg overflow-hidden shadow-2xl">
              <img src={poster} alt={title} className="w-full aspect-[2/3] object-cover" />
            </div>
          )}
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">{title}</h1>
            {year && <span className="text-zinc-400 text-sm">{year}</span>}
            <p className="text-zinc-300 text-sm sm:text-base max-w-2xl line-clamp-3">{overview}</p>
            <div className="flex gap-3 mt-2">
              <Link
                href={href}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
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
