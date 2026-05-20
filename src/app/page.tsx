import {
  getTrending,
  getNowPlaying,
  getPopularMovies,
  getPopularTV,
  getTrendingMovie,
  getTrendingTV,
  getTopRated,
  getAiringToday,
} from "@/lib/tmdb"
import HeroSection from "@/components/HeroSection"
import ContentRow from "@/components/ContentRow"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const [trending, nowPlaying, popularMovies, popularTV, trendingMovie, trendingTV, topRated, airingToday] =
    await Promise.all([
      getTrending(),
      getNowPlaying(),
      getPopularMovies(),
      getPopularTV(),
      getTrendingMovie(),
      getTrendingTV(),
      getTopRated(),
      getAiringToday(),
    ])

  return (
    <div className="pb-12">
      {trending.results?.[0] && <HeroSection item={trending.results[0]} />}
      <div className="-mt-16 relative z-20">
        <ContentRow title="Trending Now" items={trending.results?.slice(1) || []} />
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
