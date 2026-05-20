import Link from "next/link"
import type { Movie, TVShow } from "@/types"
import { getImageUrl } from "@/lib/tmdb"

interface Props {
  item: Movie | TVShow
}

export default function MovieCard({ item }: Props) {
  const id = item.id
  const title = "title" in item ? item.title : item.name
  const date = "release_date" in item ? item.release_date : item.first_air_date
  const year = date ? date.split("-")[0] : ""
  const mediaType = item.media_type || ("title" in item ? "movie" : "tv")
  const href = mediaType === "movie" ? `/movie/${id}` : `/tv/${id}`
  const poster = getImageUrl(item.poster_path, "w342")

  return (
    <Link href={href} className="group flex-shrink-0 w-[160px] sm:w-[180px] snap-start">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-zinc-800 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-red-600/20">
        {poster ? (
          <img src={poster} alt={title} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-500 text-sm p-4 text-center">
            {title}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
          <div className="text-white text-xs font-medium">
            <div className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {item.vote_average.toFixed(1)}
            </div>
            {year && <span className="text-zinc-300 mt-1 block">{year}</span>}
          </div>
        </div>
      </div>
      <p className="mt-2 text-sm text-zinc-300 truncate group-hover:text-white transition-colors">{title}</p>
    </Link>
  )
}
