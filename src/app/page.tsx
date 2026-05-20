import { getTrending, getNowPlaying, getPopularMovies, getPopularTV, getTrendingMovie, getTrendingTV, getTopRated, getAiringToday } from "@/lib/tmdb"
import HeroSection from "@/components/HeroSection"
import ContentRow from "@/components/ContentRow"

export const revalidate = 3600

export default async function HomePage() {
  const [trending, nowPlaying, popularMovies, popularTV, trendingMovie, trendingTV, topRated, airingToday] =
    await Promise.all([
      getTrending().catch(() => ({ results: [] })),
      getNowPlaying().catch(() => ({ results: [] })),
      getPopularMovies().catch(() => ({ results: [] })),
      getPopularTV().catch(() => ({ results: [] })),
      getTrendingMovie().catch(() => ({ results: [] })),
      getTrendingTV().catch(() => ({ results: [] })),
      getTopRated().catch(() => ({ results: [] })),
      getAiringToday().catch(() => ({ results: [] })),
    ])

  const heroItem = trending.results?.[0] || nowPlaying.results?.[0] || popularMovies.results?.[0]

  return (
    <div>
      {heroItem && <HeroSection item={heroItem} />}
      <div className={heroItem ? "-mt-32 relative z-20 pb-16" : "pt-8 pb-16"}>
        <ContentRow title="Trending Now" items={trending.results || []} />
        <ContentRow title="Now Playing" items={nowPlaying.results || []} />
        <ContentRow title="Trending Movies" items={trendingMovie.results || []} />
        <ContentRow title="Trending TV Shows" items={trendingTV.results || []} />
        <ContentRow title="Popular Movies" items={popularMovies.results || []} />
        <ContentRow title="Popular TV Shows" items={popularTV.results || []} />
        <ContentRow title="Top Rated" items={topRated.results || []} />
        <ContentRow title="Airing Today" items={airingToday.results || []} />
      </div>
    </div>
  )
}
