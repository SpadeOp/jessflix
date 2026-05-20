import { getPopularMovies, getNowPlaying, getTrendingMovie, getTopRated } from "@/lib/tmdb"
import ContentRow from "@/components/ContentRow"

export const revalidate = 3600

export default async function MoviesPage() {
  const [popular, nowPlaying, trending, topRated] = await Promise.all([
    getPopularMovies().catch(() => ({ results: [] })),
    getNowPlaying().catch(() => ({ results: [] })),
    getTrendingMovie().catch(() => ({ results: [] })),
    getTopRated().catch(() => ({ results: [] })),
  ])

  return (
    <div className="pt-24 pb-16">
      <div className="px-6 mb-6">
        <h1 className="text-3xl font-bold text-white">Movies</h1>
      </div>
      <ContentRow title="Trending Movies" items={trending.results || []} />
      <ContentRow title="Now Playing" items={nowPlaying.results || []} />
      <ContentRow title="Popular Movies" items={popular.results || []} />
      <ContentRow title="Top Rated" items={topRated.results || []} />
    </div>
  )
}
