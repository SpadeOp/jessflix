import { getMovieDetails } from "@/lib/tmdb"
import { getBackdropUrl, getImageUrl } from "@/lib/tmdb"
import VidkingPlayer from "@/components/VidkingPlayer"
import ContentRow from "@/components/ContentRow"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const movie = await getMovieDetails(Number(id))
  const backdrop = getBackdropUrl(movie.backdrop_path)
  const poster = getImageUrl(movie.poster_path, "w342")

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
              <img src={poster} alt={movie.title} className="w-full aspect-[2/3] object-cover" />
            </div>
          )}
          <div className="flex-1 pt-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{movie.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400 mb-4">
              <span>{movie.release_date?.split("-")[0]}</span>
              <span className="w-1 h-1 bg-zinc-600 rounded-full" />
              <span>{movie.runtime} min</span>
              <span className="w-1 h-1 bg-zinc-600 rounded-full" />
              <span className="flex items-center gap-1 text-yellow-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {movie.vote_average?.toFixed(1)}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres?.map((g: { id: number; name: string }) => (
                <span key={g.id} className="px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-300">
                  {g.name}
                </span>
              ))}
            </div>
            {movie.tagline && <p className="text-zinc-500 italic mb-2">{movie.tagline}</p>}
            <p className="text-zinc-300 leading-relaxed max-w-3xl">{movie.overview}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Watch Now</h2>
          <VidkingPlayer tmdbId={id} type="movie" color="e50914" />
        </div>

        {movie.cast && movie.cast.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Cast</h2>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
              {movie.credits?.cast?.slice(0, 20).map((person: any) => (
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

        {movie.similar?.results?.length > 0 && (
          <ContentRow title="Similar Movies" items={movie.similar.results} />
        )}
      </div>
    </div>
  )
}
