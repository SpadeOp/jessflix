"use client"

import { useEffect, useState } from "react"
import { getTrending, getNowPlaying, getPopularMovies, getPopularTV, getTrendingMovie, getTrendingTV, getTopRated, getAiringToday } from "@/lib/tmdb"
import HeroSection from "@/components/HeroSection"
import ContentRow from "@/components/ContentRow"

export default function HomePage() {
  const [sections, setSections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getTrending(),
      getNowPlaying(),
      getPopularMovies(),
      getPopularTV(),
      getTrendingMovie(),
      getTrendingTV(),
      getTopRated(),
      getAiringToday(),
    ]).then(([trending, nowPlaying, popularMovies, popularTV, trendingMovie, trendingTV, topRated, airingToday]) => {
      setSections([
        { title: "Trending Now", items: trending.results || [] },
        { title: "Now Playing", items: nowPlaying.results || [] },
        { title: "Trending Movies", items: trendingMovie.results || [] },
        { title: "Trending TV Shows", items: trendingTV.results || [] },
        { title: "Popular Movies", items: popularMovies.results || [] },
        { title: "Popular TV Shows", items: popularTV.results || [] },
        { title: "Top Rated", items: topRated.results || [] },
        { title: "Airing Today", items: airingToday.results || [] },
      ])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const allItems = sections.flatMap(s => s.items)
  const heroItem = allItems[0]

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="w-12 h-12 border-[3px] border-[#e50914] border-t-transparent rounded-full animate-spin" />
        <p className="text-zinc-500 text-sm">Loading content...</p>
      </div>
    )
  }

  return (
    <div>
      {heroItem && <HeroSection item={heroItem} />}
      <div className={heroItem ? "-mt-32 relative z-20 pb-16" : "pt-8 pb-16"}>
        {sections.map((section) => (
          <ContentRow key={section.title} title={section.title} items={section.items} />
        ))}
      </div>
    </div>
  )
}
