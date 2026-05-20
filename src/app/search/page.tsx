"use client"

import { Suspense, useEffect, useState, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { searchMulti } from "@/lib/tmdb"
import { fallbackMovies } from "@/lib/data"
import MovieCard from "@/components/MovieCard"

function SearchInner() {
  const router = useRouter()
  const params = useSearchParams()
  const q = params.get("q") || ""
  const [query, setQuery] = useState(q)
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const doSearch = useCallback(async (term: string) => {
    if (!term.trim()) { setResults([]); return }
    setLoading(true)
    try {
      const data = await searchMulti(term)
      setResults(data.results?.filter((r: any) => r.poster_path && (r.media_type === "movie" || r.media_type === "tv")) || [])
    } catch {
      const fb = fallbackMovies.filter(m =>
        m.title.toLowerCase().includes(term.toLowerCase())
      )
      setResults(fb.map(m => ({
        id: m.id,
        title: m.title,
        poster_path: m.poster,
        release_date: `${m.year}-01-01`,
        vote_average: m.rating,
        media_type: "movie",
      })))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (q) doSearch(q)
  }, [q, doSearch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div className="search-page">
      <form onSubmit={handleSubmit} style={{ marginBottom: 32 }}>
        <div className="header-search" style={{ maxWidth: 500, borderRadius: 12 }}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search movies & TV..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
        </div>
      </form>

      {q && (
        <p className="search-results-count">
          {loading ? "Searching..." : `${results.length} results for "${q}"`}
        </p>
      )}

      {results.length > 0 ? (
        <div className="movie-grid">
          {results.map((item: any) => (
            <MovieCard key={item.id} item={item} />
          ))}
        </div>
      ) : q && !loading ? (
        <p style={{ color: "var(--text-muted)" }}>No results found</p>
      ) : null}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="search-page"><p>Loading...</p></div>}>
      <SearchInner />
    </Suspense>
  )
}
