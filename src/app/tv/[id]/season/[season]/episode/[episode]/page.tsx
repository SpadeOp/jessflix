import { getTVDetails, getTVEpisodeDetails, getImageUrl, getBackdropUrl } from "@/lib/tmdb"
import VidkingPlayer from "@/components/VidkingPlayer"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ id: string; season: string; episode: string }>
}) {
  const { id, season, episode } = await params
  const [show, ep] = await Promise.all([
    getTVDetails(Number(id)),
    getTVEpisodeDetails(Number(id), Number(season), Number(episode)),
  ])

  const still = getBackdropUrl(ep.still_path) || getBackdropUrl(show.backdrop_path)

  return (
    <div className="pb-12">
      <div className="px-6 pt-20 pb-4">
        <Link
          href={`/tv/${id}`}
          className="inline-flex items-center gap-1 text-zinc-400 hover:text-white mb-4 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to {show.name}
        </Link>

        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">{show.name}</h1>
        </div>
        <p className="text-zinc-400 text-sm mb-6">
          Season {season} &middot; Episode {episode} &middot; {ep.name}
        </p>
      </div>

      <div className="px-6 mb-8">
        <VidkingPlayer tmdbId={id} type="tv" season={Number(season)} episode={Number(episode)} color="e50914" autoPlay />
      </div>

      {ep.overview && (
        <div className="px-6 mb-8">
          <h2 className="text-lg font-bold text-white mb-2">Episode Summary</h2>
          <p className="text-zinc-300 leading-relaxed max-w-3xl">{ep.overview}</p>
        </div>
      )}

      <div className="px-6">
        <div className="flex flex-wrap gap-6 text-sm text-zinc-500">
          {ep.air_date && (
            <div>
              <span className="text-zinc-400 block mb-1">Air Date</span>
              <span className="text-white">{ep.air_date}</span>
            </div>
          )}
          {ep.vote_average > 0 && (
            <div>
              <span className="text-zinc-400 block mb-1">Rating</span>
              <span className="text-yellow-400">{ep.vote_average.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
