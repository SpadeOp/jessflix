"use client"

import Link from "next/link"

const IMG = "https://image.tmdb.org/t/p/"

interface Props {
  item: {
    id: number
    title: string
    year?: number
    rating?: number
    genre?: string[]
    poster?: string
    _poster?: string
    _backdrop?: string
  }
}

export default function Card({ item }: Props) {
  const img = item._poster || (item.poster ? `${IMG}w500${item.poster}` : `https://picsum.photos/seed/${item.title.replace(/\s+/g, "-").toLowerCase()}/300/450`)
  const g = (item.genre || []).slice(0, 2)

  return (
    <Link href={`/movie/${item.id}`} className="card">
      <div className="poster-wrap">
        <img src={img} alt={item.title} loading="lazy" />
        <span className="rating-badge">&#9733; {item.rating || "N/A"}</span>
        <div className="card-overlay">
          <div className="tags">{g.map(x => <span key={x}>{x}</span>)}</div>
        </div>
      </div>
      <div className="card-info">
        <h3>{item.title}</h3>
        <div className="meta">
          <span>{item.year || "?"}</span>
          <span className="rating">&#9733; {item.rating || "N/A"}</span>
        </div>
      </div>
    </Link>
  )
}
