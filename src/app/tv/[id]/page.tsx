"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { getTVDetails, getImageUrl, getBackdropUrl } from "@/lib/tmdb"
import MovieCard from "@/components/MovieCard"

export default function TVPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [show, setShow] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getTVDetails(Number(id))
      .then(setShow)
      .catch(() => setShow(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-2 border-[#e50914] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!show) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-zinc-500">Show not found</p>
        <Link href="/" className="text-[#e50914] hover:underline">Go home</Link>
      </div>
    )
  }

  const backdrop = getBackdropUrl(show.backdrop_path)
  const poster = getImageUrl(show.poster_path, "w342")

  return (
    <div className="pb-16">
      <div className="relative w-full h-[60vh] min-h-[450px]">
        {backdrop && (
          <>
            <img src={backdrop} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 hero-gradient" />
          </>
        )}
        {!backdrop && <div className="absolute inset-0 bg-zinc-900" />}
        <div className="absolute top-6 left-6 z-10">
          <Link href="/" className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
        </div>
      </div>

      <div className="px-6 lg:px-16 -mt-48 relative z-20">
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          {poster && (
            <div className="w-[200px] flex-shrink-0 rounded-lg overflow-hidden shadow-2xl shadow-black/50 -mt-8">
              <img src={poster} alt={show.name} className="w-full aspect-[2/3] object-cover" />
            </div>
          )}
          <div className="flex-1 pt-4 md:pt-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">{show.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400 mb-4">
              {show.first_air_date && <span>{show.first_air_date.split("-")[0]}</span>}
              {show.number_of_seasons > 0 && <><span className="w-1 h-1 bg-zinc-600 rounded-full" /><span>{show.number_of_seasons} Seasons</span></>}
              {show.number_of_episodes > 0 && <><span className="w-1 h-1 bg-zinc-600 rounded-full" /><span>{show.number_of_episodes} Episodes</span></>}
              {show.vote_average > 0 && <><span className="w-1 h-1 bg-zinc-600 rounded-full" />
                <span className="flex items-center gap-1 text-yellow-400 font-medium">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {show.vote_average.toFixed(1)}
                </span>
              </>}
              {show.status && <><span className="w-1 h-1 bg-zinc-600 rounded-full" /><span>{show.status}</span></>}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {show.genres?.map((g: any) => (
                <span key={g.id} className="px-3 py-1 bg-white/10 rounded-full text-xs text-zinc-300">
                  {g.name}
                </span>
              ))}
            </div>
            {show.tagline && <p className="text-zinc-500 italic mb-3 text-sm">{show.tagline}</p>}
            <p className="text-zinc-300 leading-relaxed max-w-3xl text-sm">{show.overview}</p>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-bold text-white mb-4">Seasons</h2>
          {show.seasons?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {show.seasons.map((season: any) => {
                const seasonPoster = getImageUrl(season.poster_path, "w342")
                return (
                  <Link
                    key={season.id}
                    href={`/tv/${id}/season/${season.season_number}/episode/1`}
                    className="group"
                  >
                    <div className="aspect-[2/3] rounded-lg overflow-hidden bg-zinc-800 mb-2 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-[#e50914]/10">
                      {seasonPoster ? (
                        <img src={seasonPoster} alt={season.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600 text-sm p-2 text-center">
                          {season.name}
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-white font-medium truncate">{season.name}</p>
                    <p className="text-xs text-zinc-500">{season.episode_count} episodes</p>
                  </Link>
                )
              })}
            </div>
          ) : (
            <p className="text-zinc-500 text-sm">No season information available.</p>
          )}
        </div>

        {show.credits?.cast?.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">Cast</h2>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
              {show.credits.cast.slice(0, 15).map((person: any) => (
                <div key={person.id} className="flex-shrink-0 w-[100px] text-center">
                  <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-zinc-800 mx-auto mb-2 ring-2 ring-white/10">
                    {person.profile_path ? (
                      <img src={getImageUrl(person.profile_path, "w185")!} alt={person.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-white font-medium truncate">{person.name}</p>
                  <p className="text-[10px] text-zinc-500 truncate">{person.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {show.recommendations?.results?.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">You Might Also Like</h2>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
              {show.recommendations.results.slice(0, 10).map((item: any) => (
                <MovieCard
                  key={item.id}
                  id={item.id}
                  title={item.title || item.name || ""}
                  poster={item.poster_path}
                  rating={item.vote_average || 0}
                  year={(item.release_date || item.first_air_date || "").split("-")[0]}
                  mediaType={item.title ? "movie" : "tv"}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
