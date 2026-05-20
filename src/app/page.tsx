"use client"

import { useEffect, useState } from "react"
import HeroSection from "@/components/HeroSection"
import ContentRow from "@/components/ContentRow"
import { getTrending, getPopular, getTopRated, getNowPlaying, getTVPopular } from "@/lib/tmdb"
import { fallbackMovies, shuffleArray } from "@/lib/data"

export default function Home() {
  const [hero, setHero] = useState<any[]>([])
  const [trending, setTrending] = useState<any[]>([])
  const [popular, setPopular] = useState<any[]>([])
  const [topRated, setTopRated] = useState<any[]>([])
  const [nowPlaying, setNowPlaying] = useState<any[]>([])
  const [tvPopular, setTvPopular] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      try {
        const [trend, pop, top, now, tv] = await Promise.allSettled([
          getTrending(), getPopular(), getTopRated(), getNowPlaying(), getTVPopular(),
        ])

        if (trend.status === "fulfilled") setTrending(trend.value.results.filter((r: any) => r.poster_path))
        if (pop.status === "fulfilled") setPopular(pop.value.results.filter((r: any) => r.poster_path))
        if (top.status === "fulfilled") setTopRated(top.value.results.filter((r: any) => r.poster_path))
        if (now.status === "fulfilled") setNowPlaying(now.value.results.filter((r: any) => r.poster_path))
        if (tv.status === "fulfilled") setTvPopular(tv.value.results.filter((r: any) => r.poster_path))

        const anyOk = [trend, pop, top, now, tv].some(r => r.status === "fulfilled")
        if (anyOk) {
          const heroItems = trend.status === "fulfilled"
            ? trend.value.results.slice(0, 5)
            : pop.status === "fulfilled" ? pop.value.results.slice(0, 5)
            : now.status === "fulfilled" ? now.value.results.slice(0, 5)
            : []
          if (heroItems.length) setHero(heroItems)
        } else {
          setHero(fallbackMovies.slice(0, 5))
          setTrending(shuffleArray(fallbackMovies))
          setPopular(shuffleArray(fallbackMovies))
          setTopRated(shuffleArray(fallbackMovies))
          setNowPlaying(shuffleArray(fallbackMovies))
          setTvPopular(shuffleArray(fallbackMovies))
        }
      } catch {
        setHero(fallbackMovies.slice(0, 5))
        setTrending(shuffleArray(fallbackMovies))
        setPopular(shuffleArray(fallbackMovies))
        setTopRated(shuffleArray(fallbackMovies))
        setNowPlaying(shuffleArray(fallbackMovies))
        setTvPopular(shuffleArray(fallbackMovies))
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  return (
    <>
      <HeroSection items={hero} />
      {loading ? (
        <section className="section">
          <div className="section-header"><h2 className="section-title">Loading...</h2></div>
          <div style={{ display: "flex", gap: 12 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton skeleton-poster" />
                <div className="skeleton skeleton-text" />
              </div>
            ))}
          </div>
        </section>
      ) : (
        <>
          {trending.length > 0 && <ContentRow title="Trending Now" items={trending} />}
          {popular.length > 0 && <ContentRow title="Popular Movies" items={popular} />}
          {topRated.length > 0 && <ContentRow title="Top Rated" items={topRated} />}
          {nowPlaying.length > 0 && <ContentRow title="Now Playing" items={nowPlaying} />}
          {tvPopular.length > 0 && <ContentRow title="Popular TV Shows" items={tvPopular} />}
        </>
      )}
    </>
  )
}
