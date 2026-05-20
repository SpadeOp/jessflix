"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { getTV } from "@/lib/tmdb"
import VidkingPlayer from "@/components/VidkingPlayer"

export default function EpisodePage() {
  const { id, season, episode } = useParams()
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    getTV(Number(id)).then(setData).catch(() => {})
  }, [id])

  const sNum = Number(season)
  const eNum = Number(episode)
  const seasonData = data?.seasons?.find((s: any) => s.season_number === sNum)
  const episodeData = seasonData?.episodes?.[eNum - 1]

  return (
    <div className="watch-page">
      <div style={{ marginBottom: 16, display: "flex", gap: 12, alignItems: "center" }}>
        <Link href={`/tv/${id}`} style={{ color: "var(--accent)", fontSize: 14 }}>
          &larr; {data?.name || "Show"}
        </Link>
        <span style={{ color: "var(--text-muted)" }}>/</span>
        <span style={{ fontSize: 14, color: "var(--text-muted)" }}>Season {sNum}</span>
      </div>

      <VidkingPlayer tmdbId={Number(id)} type="tv" season={sNum} episode={eNum} />

      <div className="player-info">
        <h2>{episodeData?.name || `Episode ${eNum}`}</h2>
        <span className="ep-meta">S{sNum} E{eNum}</span>
      </div>

      {episodeData?.overview && (
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 24, maxWidth: 700 }}>
          {episodeData.overview}
        </p>
      )}

      <div className="episode-nav">
        {eNum > 1 && (
          <Link href={`/tv/${id}/season/${sNum}/episode/${eNum - 1}`}>
            &larr; Previous
          </Link>
        )}
        <Link href={`/tv/${id}/season/${sNum}/episode/${eNum + 1}`}>
          Next &rarr;
        </Link>
      </div>
    </div>
  )
}
