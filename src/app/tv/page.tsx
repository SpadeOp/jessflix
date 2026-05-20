"use client"

import { useEffect, useState } from "react"
import { getTVPopular } from "@/lib/tmdb"
import { fallbackMovies, shuffleArray } from "@/lib/data"
import MovieCard from "@/components/MovieCard"

export default function TVPage() {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    getTVPopular()
      .then(d => setItems(d.results.filter((r: any) => r.poster_path)))
      .catch(() => setItems(shuffleArray(fallbackMovies).map(m => ({ ...m, name: m.title, first_air_date: `${m.year}-01-01`, media_type: "tv" }))))
  }, [])

  return (
    <div className="search-page">
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24 }}>TV Shows</h1>
      <div className="movie-grid">
        {items.map(item => <MovieCard key={item.id} item={item} />)}
      </div>
    </div>
  )
}
