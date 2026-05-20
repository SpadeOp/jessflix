"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { getTV, imgUrl, imgOriginal } from "@/lib/tmdb"
import ContentRow from "@/components/ContentRow"

export default function TVPage() {
  const { id } = useParams()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      try {
        const t = await getTV(Number(id))
        setData(t)
      } catch {
        // no fallback for TV
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  if (loading) {
    return (
      <div style={{ padding: 48 }}>
        <div className="skeleton" style={{ width: "60%", height: 36, marginBottom: 16 }} />
        <div className="skeleton" style={{ width: "40%", height: 20, marginBottom: 12 }} />
        <div className="skeleton" style={{ width: "100%", height: 200 }} />
      </div>
    )
  }

  if (!data) return <div className="section"><h2>Show not found</h2></div>

  const cast = data.credits?.cast?.slice(0, 10) || []
  const seasons = data.seasons?.filter((s: any) => s.season_number > 0) || []
  const recs = data.recommendations?.results?.filter((r: any) => r.poster_path)?.slice(0, 10) || []

  return (
    <>
      <section className="detail-hero">
        {data.backdrop_path && (
          <div
            className="hero-backdrop"
            style={{ backgroundImage: `url(${imgOriginal(data.backdrop_path)})` }}
          />
        )}
        <div className="hero-overlay" />
      </section>

      <div className="detail-content">
        <div className="detail-poster">
          {data.poster_path ? (
            <img src={imgUrl(data.poster_path, "w500")} alt={data.name} />
          ) : (
            <div className="placeholder-img" style={{ aspectRatio: "2/3" }}>?</div>
          )}
        </div>
        <div className="detail-info">
          <h1>{data.name}</h1>
          <div className="detail-meta">
            <span>{data.first_air_date?.slice(0, 4)}</span>
            <span>{data.number_of_seasons} Seasons</span>
            <span>{data.number_of_episodes} Episodes</span>
            <div className="detail-stars">
              {Array.from({ length: 5 }).map((_, i) => {
                const val = data.vote_average / 2
                return (
                  <svg key={i} viewBox="0 0 20 20" fill="currentColor" className={i < val ? "" : "empty"}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                )
              })}
              <span className="detail-rating-text">{data.vote_average?.toFixed(1)}</span>
            </div>
          </div>
          <div className="detail-tags">
            {(data.genres || []).map((g: any) => (
              <span key={g.name} className="detail-tag">{g.name}</span>
            ))}
          </div>
          <p className="detail-overview">{data.overview}</p>

          {seasons.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <h3 style={{ marginBottom: 16, fontSize: 18 }}>Seasons</h3>
              <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
                {seasons.map((s: any) => (
                  <Link
                    key={s.season_number}
                    href={`/tv/${data.id}/season/${s.season_number}/episode/1`}
                    className="movie-card"
                    style={{ width: 140 }}
                  >
                    <div className="movie-card-poster">
                      {s.poster_path ? (
                        <img src={imgUrl(s.poster_path, "w185")} alt={s.name} loading="lazy" />
                      ) : (
                        <div className="placeholder-img" style={{ aspectRatio: "2/3" }}>?</div>
                      )}
                    </div>
                    <div className="movie-card-info">
                      <div className="movie-card-title">{s.name}</div>
                      <div className="movie-card-year">{s.episode_count} episodes</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {cast.length > 0 && (
            <div>
              <h3 style={{ marginBottom: 16, fontSize: 18 }}>Cast</h3>
              <div className="cast-list">
                {cast.map((c: any) => (
                  <div key={c.id} className="cast-card">
                    {c.profile_path ? (
                      <img src={imgUrl(c.profile_path, "w185")} alt={c.name} />
                    ) : (
                      <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--bg-card)", margin: "0 auto 8px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontSize: 24 }}>?</div>
                    )}
                    <div className="cast-name">{c.name}</div>
                    <div className="cast-role">{c.character}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {recs.length > 0 && (
        <section className="section" style={{ marginTop: 0 }}>
          <div className="section-header">
            <h2 className="section-title">More Like This</h2>
          </div>
          <div className="movie-grid">
            {recs.map((r: any) => (
              <Link key={r.id} href={`/tv/${r.id}`} className="movie-card">
                <div className="movie-card-poster">
                  {r.poster_path ? (
                    <img src={imgUrl(r.poster_path, "w342")} alt={r.name} loading="lazy" />
                  ) : (
                    <div className="placeholder-img">?</div>
                  )}
                </div>
                <div className="movie-card-info">
                  <div className="movie-card-title">{r.name}</div>
                  <div className="movie-card-year">{r.first_air_date?.slice(0, 4)}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
