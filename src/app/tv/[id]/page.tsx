import { getTVDetails, getImageUrl, getBackdropUrl } from "@/lib/tmdb"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function TVPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const show = await getTVDetails(Number(id))
  const backdrop = getBackdropUrl(show.backdrop_path)
  const poster = getImageUrl(show.poster_path, "w342")

  return (
    <div className="pb-12">
      <div className="relative w-full h-[50vh] min-h-[400px]">
        {backdrop && (
          <>
            <img src={backdrop} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          </>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-zinc-400 hover:text-white mb-3 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
        </div>
      </div>

      <div className="px-6 -mt-32 relative z-20">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {poster && (
            <div className="w-[200px] flex-shrink-0 rounded-lg overflow-hidden shadow-2xl">
              <img src={poster} alt={show.name} className="w-full aspect-[2/3] object-cover" />
            </div>
          )}
          <div className="flex-1 pt-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{show.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400 mb-4">
              <span>{show.first_air_date?.split("-")[0]}</span>
              <span className="w-1 h-1 bg-zinc-600 rounded-full" />
              <span>{show.number_of_seasons} Seasons</span>
              <span className="w-1 h-1 bg-zinc-600 rounded-full" />
              <span>{show.number_of_episodes} Episodes</span>
              <span className="w-1 h-1 bg-zinc-600 rounded-full" />
              <span className="flex items-center gap-1 text-yellow-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {show.vote_average?.toFixed(1)}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {show.genres?.map((g: { id: number; name: string }) => (
                <span key={g.id} className="px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-300">
                  {g.name}
                </span>
              ))}
            </div>
            {show.tagline && <p className="text-zinc-500 italic mb-2">{show.tagline}</p>}
            <p className="text-zinc-300 leading-relaxed max-w-3xl">{show.overview}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Seasons</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {show.seasons?.map((season: any) => {
              const seasonPoster = getImageUrl(season.poster_path, "w342")
              return (
                <Link
                  key={season.id}
                  href={`/tv/${id}/season/${season.season_number}/episode/1`}
                  className="group"
                >
                  <div className="aspect-[2/3] rounded-lg overflow-hidden bg-zinc-800 mb-2">
                    {seasonPoster ? (
                      <img
                        src={seasonPoster}
                        alt={season.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
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
        </div>

        {show.credits?.cast?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Cast</h2>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
              {show.credits.cast.slice(0, 20).map((person: any) => (
                <div key={person.id} className="flex-shrink-0 w-[120px] text-center">
                  <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-zinc-800 mx-auto mb-2">
                    {person.profile_path ? (
                      <img
                        src={getImageUrl(person.profile_path, "w185")!}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600">N/A</div>
                    )}
                  </div>
                  <p className="text-sm text-white font-medium truncate">{person.name}</p>
                  <p className="text-xs text-zinc-500 truncate">{person.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
