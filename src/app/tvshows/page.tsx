"use client"

import { useEffect, useState } from "react"
import { getPopularTV, getTrendingTV, getAiringToday } from "@/lib/tmdb"
import ContentRow from "@/components/ContentRow"

export default function TVShowsPage() {
  const [sections, setSections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getPopularTV(),
      getTrendingTV(),
      getAiringToday(),
    ]).then(([popular, trending, airingToday]) => {
      setSections([
        { title: "Trending TV Shows", items: trending.results || [] },
        { title: "Airing Today", items: airingToday.results || [] },
        { title: "Popular TV Shows", items: popular.results || [] },
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
        <h1 className="text-3xl font-bold text-white">TV Shows</h1>
      </div>
      {sections.map((section) => (
        <ContentRow key={section.title} title={section.title} items={section.items} />
      ))}
    </div>
  )
}
