"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { movies } from "@/lib/data"
import Card from "@/components/Card"
import { tmdbImg } from "@/lib/tmdb"

function SearchInner() {
  const params = useSearchParams()
  const q = params.get("q") || ""
  const [query, setQuery] = useState(q)
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    movies.forEach((m: any) => {
      m._poster = m.poster ? tmdbImg(m.poster, "w500") : undefined
    })
  }, [])

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const r = movies.filter(m => m.title.toLowerCase().includes(query.toLowerCase()))
    setResults(r)
  }, [query])

  return (
    <div className="search-page">
      <div className="page-header">
        <h1>Search</h1>
      </div>
      <div className="search-box" style={{ maxWidth: 500, marginBottom: "1.5rem" }}>
        <input type="text" placeholder="Movies..." value={query} onChange={e => setQuery(e.target.value)} />
        <button>&#128269;</button>
      </div>
      {query && (
        <div className="search-results-info">
          {results.length} result{results.length !== 1 ? "s" : ""} for &quot;{query}&quot;
        </div>
      )}
      {results.length > 0 ? (
        <div className="content-grid">
          {results.map(m => <Card key={m.id} item={m} />)}
        </div>
      ) : query ? (
        <div className="no-results">No results found.</div>
      ) : (
        <div className="search-results-info">Type to search movies.</div>
      )}
      <footer><p>JessFlix &copy; 2024</p></footer>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="loading" />}>
      <SearchInner />
    </Suspense>
  )
}
