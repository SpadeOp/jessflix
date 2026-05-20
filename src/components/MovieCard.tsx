"use client"

import Link from "next/link"
import { imgUrl } from "@/lib/tmdb"

interface Props {
  item: {
    id: number
    title?: string
    name?: string
    poster_path?: string
    release_date?: string
    first_air_date?: string
    vote_average?: number
    media_type?: string
  }
}

export default function MovieCard({ item }: Props) {
  const title = item.title || item.name || "Unknown"
  const year = (item.release_date || item.first_air_date || "").slice(0, 4)
  const rating = item.vote_average ? item.vote_average.toFixed(1) : null
  const type = item.media_type || (item.title ? "movie" : "tv")
  const href = type === "movie" ? `/movie/${item.id}` : `/tv/${item.id}`

  return (
    <Link href={href} className="movie-card">
      <div className="movie-card-poster">
        {item.poster_path ? (
          <img src={imgUrl(item.poster_path, "w342")} alt={title} loading="lazy" />
        ) : (
          <div className="placeholder-img">?</div>
        )}
        <div className="movie-card-overlay">
          <div className="play-btn-overlay">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <button className="fav-btn" onClick={e => { e.preventDefault(); e.stopPropagation() }}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        {rating && (
          <div className="movie-card-rating">
            <svg fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            {rating}
          </div>
        )}
      </div>
      <div className="movie-card-info">
        <div className="movie-card-title">{title}</div>
        {year && <div className="movie-card-year">{year}</div>}
      </div>
    </Link>
  )
}
