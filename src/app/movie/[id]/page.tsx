"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import Link from "next/link"
import { movies } from "@/lib/data"
import { tmdbImg, tmdbFetch } from "@/lib/tmdb"

export default function MovieDetail() {
  return (
    <Suspense fallback={<div className="loading" />}>
      <MovieDetailInner />
    </Suspense>
  )
}

import { Suspense } from "react"

function MovieDetailInner() {
  const { id } = useParams()
  const search = useSearchParams()
  const watch = search.get("watch")
  const numId = Number(id)

  const m = movies.find(x => x.id === numId)

  if (!m) return <div className="no-results" style={{ display: "block" }}>Movie not found. <Link href="/movies" className="back-link">Back</Link></div>

  const [tmdb, setTmdb] = useState<any>(null)
  const [userRating, setUserRating] = useState(0)

  useEffect(() => {
    const img = m.poster ? tmdbImg(m.poster, "w500") : undefined
    const bg = m.backdrop ? tmdbImg(m.backdrop, "w1280") : undefined
    ;(m as any)._poster = img
    ;(m as any)._backdrop = bg
    if (m.tmdbId) {
      tmdbFetch(`/movie/${m.tmdbId}`).then(setTmdb).catch(() => {})
    }
    const saved = localStorage.getItem(`jf_rating_${m.id}`)
    if (saved) setUserRating(Number(saved))
  }, [m.id])

  const posterUrl = (m as any)._poster || `https://picsum.photos/seed/${m.title.replace(/\s+/g, "-").toLowerCase()}/300/450`
  const bgUrl = (m as any)._backdrop
    ? { background: `linear-gradient(180deg,transparent 0,var(--bg) 100%),url(${(m as any)._backdrop}) center/cover no-repeat` }
    : {}
  const tagline = tmdb?.tagline || m.tagline
  const plot = tmdb?.overview || m.plot
  const runtime = tmdb?.runtime ? `${Math.floor(tmdb.runtime / 60)}h ${tmdb.runtime % 60}m` : m.runtime
  const rating = tmdb?.vote_average?.toFixed(1) || m.rating
  const genres = tmdb?.genres?.map((g: any) => g.name) || m.genre
  const year = tmdb?.release_date?.slice(0, 4) || m.year

  if (watch === "1") {
    return (
      <div className="player-page">
        <div className="player-header">
          <Link href={`/movie/${m.id}`} className="back-link">&larr; Back</Link>
          <h2>{m.title}</h2>
        </div>
        <div className="player-container">
          <iframe
            src={`https://www.vidking.net/embed/movie/${m.tmdbId}?color=7c5cfc&autoPlay=1`}
            allowFullScreen
            allow="autoplay; fullscreen"
          />
        </div>
        <div className="player-controls">
          <span className="label">Source:</span>
          <button className="source-btn active">VidKing</button>
          <button className="source-btn" onClick={e => {
            (e.target as HTMLButtonElement).classList.add("active")
            const iframe = document.querySelector(".player-container iframe") as HTMLIFrameElement
            iframe.src = `https://rivestream.ru/embed?type=movie&id=${m.tmdbId}`
            document.querySelectorAll(".source-btn").forEach(b => b.classList.remove("active"))
            ;(e.target as HTMLButtonElement).classList.add("active")
          }}>RiveStream</button>
          <button className="source-btn" onClick={e => {
            (e.target as HTMLButtonElement).classList.add("active")
            const iframe = document.querySelector(".player-container iframe") as HTMLIFrameElement
            iframe.src = `https://vidsrc.to/embed/movie/${m.tmdbId}`
            document.querySelectorAll(".source-btn").forEach(b => b.classList.remove("active"))
            ;(e.target as HTMLButtonElement).classList.add("active")
          }}>VidSrc</button>
        </div>
        <footer><p>JessFlix &copy; 2024</p></footer>
      </div>
    )
  }

  return (
    <>
      <div className="detail-page" style={bgUrl}>
        <div className="detail-poster">
          <img src={posterUrl} alt={m.title} />
          <Link href={`/movie/${m.id}?watch=1`} className="detail-watch-btn">&#9654; Watch Now</Link>
        </div>
        <div className="detail-info">
          <Link href="/movies" className="back-link">&larr; Back to Movies</Link>
          <h1>{m.title}</h1>
          <p className="detail-tagline">{tagline}</p>
          <div className="detail-meta">
            <span><strong>Year:</strong> {year}</span>
            <span><strong>Runtime:</strong> {runtime}</span>
            <span><strong>Rating:</strong> &#9733; {rating}/10</span>
            <span><strong>Director:</strong> {m.director}</span>
          </div>
          <div className="detail-genres">
            {genres.map((g: string) => <span key={g} className="tag">{g}</span>)}
          </div>
          <p className="detail-plot">{plot}</p>

          <div className="user-rating">
            <h3>Your Rating</h3>
            <div className="star-rating">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(s => (
                <button
                  key={s}
                  className={s <= userRating ? "active" : ""}
                  onClick={() => {
                    setUserRating(s)
                    localStorage.setItem(`jf_rating_${m.id}`, String(s))
                  }}
                >&#9733;</button>
              ))}
            </div>
            {userRating > 0 && <div className="your-rating">Your rating: {userRating}/10</div>}
          </div>

          <div className="detail-cast">
            <h3>Cast</h3>
            <div className="cast-grid">
              {m.cast.map(a => (
                <div key={a} className="cast-item">
                  <img src={`https://picsum.photos/seed/${a.replace(/\s+/g, "-").toLowerCase()}/100/100`} alt={a} />
                  <div className="name">{a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <footer><p>JessFlix &copy; 2024</p></footer>
    </>
  )
}
