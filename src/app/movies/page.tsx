import { getPopularMovies, getNowPlaying, getTrendingMovie, getTopRated } from "@/lib/tmdb"
import ContentRow from "@/components/ContentRow"

export const dynamic = "force-dynamic"

export default async function MoviesPage() {
  const [popular, nowPlaying, trending, topRated] = await Promise.all([
    getPopularMovies(),
    getNowPlaying(),
    getTrendingMovie(),
    getTopRated(),
  ])

  return (
    <div className="pt-24 pb-12">
      <div className="px-6 mb-8">
        <h1 className="text-3xl font-bold text-white">Movies</h1>
      </div>
      <ContentRow title="Trending Movies" items={trending.results || []} />
      <ContentRow title="Now Playing" items={nowPlaying.results || []} />
      <ContentRow title="Popular Movies" items={popular.results || []} />
      <ContentRow title="Top Rated" items={topRated.results || []} />
    </div>
  )
}
