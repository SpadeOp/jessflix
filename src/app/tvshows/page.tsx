import { getPopularTV, getTrendingTV, getAiringToday } from "@/lib/tmdb"
import ContentRow from "@/components/ContentRow"

export const dynamic = "force-dynamic"

export default async function TVShowsPage() {
  const [popular, trending, airingToday] = await Promise.all([
    getPopularTV(),
    getTrendingTV(),
    getAiringToday(),
  ])

  return (
    <div className="pt-24 pb-12">
      <div className="px-6 mb-8">
        <h1 className="text-3xl font-bold text-white">TV Shows</h1>
      </div>
      <ContentRow title="Trending TV Shows" items={trending.results || []} />
      <ContentRow title="Airing Today" items={airingToday.results || []} />
      <ContentRow title="Popular TV Shows" items={popular.results || []} />
    </div>
  )
}
