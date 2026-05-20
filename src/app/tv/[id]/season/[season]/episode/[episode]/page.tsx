"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { getTVDetails, getTVEpisodeDetails, getImageUrl, getBackdropUrl } from "@/lib/tmdb"
import VidkingPlayer from "@/components/VidkingPlayer"

export default function EpisodePage({
  params,
}: {
  params: Promise<{ id: string; season: string; episode: string }>
}) {
  const { id, season, episode } = use(params)
  const [data, setData] = useState<{ show: any; ep: any } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      getTVDetails(Number(id)),
      getTVEpisodeDetails(Number(id), Number(season), Number(episode)),
    ])
      .then(([show, ep]) => setData({ show, ep }))
      .catch(() => setData(null))
      .finally(() => setLoading(false))
  }, [id, season, episode])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-2 border-[#e50914] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-zinc-500">Episode not found</p>
        <Link href="/" className="text-[#e50914] hover:underline">Go home</Link>
      </div>
    )
  }

  const { show, ep } = data

  return (
    <div className="pb-16">
      <div className="px-6 lg:px-16 pt-24 pb-6">
        <Link
          href={`/tv/${id}`}
          className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white mb-6 transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to {show.name}
        </Link>

        <h1 className="text-3xl font-bold text-white mb-1">{show.name}</h1>
        <p className="text-zinc-400 text-sm">
          Season {season} &middot; Episode {episode}
          {ep.name && <span> &middot; {ep.name}</span>}
        </p>
      </div>

      <div className="px-6 lg:px-16 mb-8">
        <div className="max-w-4xl">
          <VidkingPlayer tmdbId={id} type="tv" season={Number(season)} episode={Number(episode)} color="e50914" autoPlay />
        </div>
      </div>

      <div className="px-6 lg:px-16 max-w-4xl">
        {ep.overview && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white mb-2">Episode Summary</h2>
            <p className="text-zinc-300 leading-relaxed text-sm">{ep.overview}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-6 text-sm">
          {ep.air_date && (
            <div>
              <span className="text-zinc-500 block mb-0.5 text-xs uppercase tracking-wider">Air Date</span>
              <span className="text-white">{ep.air_date}</span>
            </div>
          )}
          {ep.vote_average > 0 && (
            <div>
              <span className="text-zinc-500 block mb-0.5 text-xs uppercase tracking-wider">Rating</span>
              <span className="flex items-center gap-1 text-yellow-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {ep.vote_average.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
