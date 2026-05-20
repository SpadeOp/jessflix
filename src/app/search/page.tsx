"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import MovieCard from "@/components/MovieCard"
import { searchMulti } from "@/lib/tmdb"
import type { Movie, TVShow } from "@/types"

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const q = searchParams.get("q") || ""
  const [query, setQuery] = useState(q)
  const [results, setResults] = useState<(Movie | TVShow)[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!q) { setResults([]); return }
    setLoading(true)
    searchMulti(q).then((data) => {
      setResults(data.results?.filter((r: any) => r.media_type !== "person") || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [q])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <div className="pt-20 px-6 pb-12">
      <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies, TV shows..."
            className="w-full px-5 py-3.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors text-lg"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>

      {loading && (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {!loading && q && results.length === 0 && (
        <p className="text-center text-zinc-500 py-12">No results found for &quot;{q}&quot;</p>
      )}

      {!loading && results.length > 0 && (
        <>
          <p className="text-zinc-400 mb-6">
            Results for <span className="text-white font-medium">&quot;{q}&quot;</span>
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {results.map((item) => (
              <MovieCard key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="pt-20 px-6 pb-12 text-center text-zinc-500">Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
}
