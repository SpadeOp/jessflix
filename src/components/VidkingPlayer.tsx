"use client"

interface Props {
  tmdbId: string
  type: "movie" | "tv"
  season?: number
  episode?: number
  color?: string
  autoPlay?: boolean
}

export default function VidkingPlayer({ tmdbId, type, season, episode, color = "e50914", autoPlay = false }: Props) {
  let src = `https://www.vidking.net/embed/${type}/${tmdbId}`
  if (type === "tv" && season && episode) {
    src += `/${season}/${episode}`
  }
  const params = new URLSearchParams({ color, autoPlay: String(autoPlay) })
  if (type === "tv") {
    params.set("nextEpisode", "true")
    params.set("episodeSelector", "true")
  }
  src += `?${params.toString()}`

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      <iframe
        src={src}
        className="w-full h-full"
        allowFullScreen
        allow="autoplay; fullscreen"
        referrerPolicy="origin"
      />
    </div>
  )
}
