"use client"

import { useEffect, useState } from "react"
import { movies, genres } from "@/lib/data"
import { tmdbImg } from "@/lib/tmdb"
import Card from "@/components/Card"

export default function TVPage() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    movies.forEach((m: any) => { m._poster = m.poster ? tmdbImg(m.poster, "w500") : undefined })
    setReady(true)
  }, [])
  if (!ready) return null

  return (
    <>
      <div className="page-header"><h1>TV Shows</h1></div>
      <div className="content-grid">
        {movies.slice(0, 12).map((m, i) => (
          <Card key={100 + i} item={{ ...m, id: 100 + i, title: m.title + " (Series)" }} />
        ))}
      </div>
      <footer><p>JessFlix &copy; 2024</p></footer>
    </>
  )
}
