"use client"

import { useEffect, useState } from "react"
import { movies, genres } from "@/lib/data"
import Card from "@/components/Card"
import { tmdbImg } from "@/lib/tmdb"

export default function MoviesPage() {
  const [query, setQuery] = useState("")
  const [genre, setGenre] = useState("All")
  const [ready, setReady] = useState(false)

  useEffect(() => {
    movies.forEach((m: any) => {
      m._poster = m.poster ? tmdbImg(m.poster, "w500") : undefined
    })
    setReady(true)
  }, [])

  if (!ready) return null

  const filtered = query
    ? movies.filter(m => m.title.toLowerCase().includes(query.toLowerCase()))
    : [...movies]

  const items = genre === "All" ? filtered : filtered.filter(m => m.genre.includes(genre))

  return (
    <>
      <div className="page-header">
        <h1>Movies</h1>
        <div className="search-box">
          <input type="text" placeholder="Search movies..." value={query} onChange={e => setQuery(e.target.value)} />
          <button>&#128269;</button>
        </div>
      </div>

      <div className="page-layout">
        <div className="filter-sidebar">
          <h3>Genres</h3>
          <div className="filter-list">
            <button className={`filter-btn ${genre === "All" ? "active" : ""}`} onClick={() => setGenre("All")}>All</button>
            {genres.map(g => (
              <button key={g} className={`filter-btn ${genre === g ? "active" : ""}`} onClick={() => setGenre(g)}>{g}</button>
            ))}
          </div>
        </div>
        <div className="grid-area">
          {items.length > 0 ? (
            <div className="content-grid">
              {items.map(m => <Card key={m.id} item={m} />)}
            </div>
          ) : (
            <div className="no-results">No movies found.</div>
          )}
        </div>
      </div>

      <footer><p>JessFlix &copy; 2024</p></footer>
    </>
  )
}
