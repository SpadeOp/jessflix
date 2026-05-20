"use client"

import { useEffect, useState } from "react"
import { getPopularMovies, getNowPlaying, getTrendingMovie, getTopRated } from "@/lib/tmdb"
import ContentRow from "@/components/ContentRow"

export default function MoviesPage() {
  const [sections, setSections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getPopularMovies(),
      getNowPlaying(),
      getTrendingMovie(),
      getTopRated(),
    ]).then(([popular, nowPlaying, trending, topRated]) => {
      setSections([
        { title: "Trending Movies", items: trending.results || [] },
        { title: "Now Playing", items: nowPlaying.results || [] },
        { title: "Popular Movies", items: popular.results || [] },
        { title: "Top Rated", items: topRated.results || [] },
      ])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-2 border-[#e50914] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      <div className="px-6 mb-6">
        <h1 className="text-3xl font-bold text-white">Movies</h1>
      </div>
      {sections.map((section) => (
        <ContentRow key={section.title} title={section.title} items={section.items} />
      ))}
    </div>
  )
}
