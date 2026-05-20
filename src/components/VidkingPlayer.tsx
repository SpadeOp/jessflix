"use client"

import { useState } from "react"

interface Props {
  tmdbId: number
  type?: "movie" | "tv"
  season?: number
  episode?: number
}

const sources = [
  { label: "VidKing", url: (i: number, t: string, s?: number, e?: number) =>
    t === "movie"
      ? `https://www.vidking.net/embed/movie/${i}?color=7c5cfc&autoPlay=1`
      : `https://www.vidking.net/embed/tv/${i}/${s}/${e}?color=7c5cfc&autoPlay=1&nextEpisode=1&episodeSelector=1`
  },
  { label: "RiveStream", url: (i: number, t: string, s?: number, e?: number) =>
    `https://rivestream.xyz/embed/${t === "movie" ? "movie" : "tv"}?${t === "movie" ? `id=${i}` : `id=${i}&s=${s}&e=${e}`}`
  },
  { label: "VidSrc", url: (i: number, t: string, s?: number, e?: number) =>
    `https://vidsrc.to/embed/${t === "movie" ? "movie" : "tv"}/${i}${t !== "movie" ? `/${s}/${e}` : ""}`
  },
  { label: "2Embed", url: (i: number, t: string, s?: number, e?: number) =>
    `https://www.2embed.cc/embed${t === "movie" ? `/${i}` : `/${i}/${s}/${e}`}`
  },
]

export default function VidkingPlayer({ tmdbId, type = "movie", season, episode }: Props) {
  const [srcIdx, setSrcIdx] = useState(0)

  const src = sources[srcIdx]
  const iframeUrl = src.url(tmdbId, type, season, episode)

  return (
    <div>
      <div className="source-selector">
        {sources.map((s, i) => (
          <button
            key={s.label}
            className={`source-btn ${i === srcIdx ? "active" : ""}`}
            onClick={() => setSrcIdx(i)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="watch-player">
        <iframe
          src={iframeUrl}
          allowFullScreen
          allow="autoplay; encrypted-media"
          referrerPolicy="origin"
        />
      </div>
    </div>
  )
}
