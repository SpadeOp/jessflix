const TMDB_BASE = "https://api.themoviedb.org/3"
const API_KEY = "986cbbcc2f29966e58658da1746adfff"

const options = {
  headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
}

async function fetchTMDB<T>(endpoint: string, params = ""): Promise<T> {
  const url = `${TMDB_BASE}${endpoint}?language=en-US${params}`
  const res = await fetch(url, { ...options, next: { revalidate: 3600 } })
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`)
  return res.json()
}

export async function getTrending(page = 1) {
  return fetchTMDB<any>(`/trending/all/week`, `&page=${page}`)
}

export async function getTrendingMovie(page = 1) {
  return fetchTMDB<any>(`/trending/movie/week`, `&page=${page}`)
}

export async function getTrendingTV(page = 1) {
  return fetchTMDB<any>(`/trending/tv/week`, `&page=${page}`)
}

export async function getPopularMovies(page = 1) {
  return fetchTMDB<any>(`/movie/popular`, `&page=${page}&region=US`)
}

export async function getPopularTV(page = 1) {
  return fetchTMDB<any>(`/tv/popular`, `&page=${page}`)
}

export async function getNowPlaying(page = 1) {
  return fetchTMDB<any>(`/movie/now_playing`, `&page=${page}&region=US`)
}

export async function getAiringToday(page = 1) {
  return fetchTMDB<any>(`/tv/airing_today`, `&page=${page}`)
}

export async function getTopRated(page = 1) {
  return fetchTMDB<any>(`/movie/top_rated`, `&page=${page}`)
}

export async function getUpcoming(page = 1) {
  return fetchTMDB<any>(`/movie/upcoming`, `&page=${page}`)
}

export async function getMovieDetails(id: number) {
  return fetchTMDB<any>(`/movie/${id}`, `&append_to_response=credits,videos,similar,recommendations,external_ids`)
}

export async function getTVDetails(id: number) {
  return fetchTMDB<any>(`/tv/${id}`, `&append_to_response=credits,external_ids,recommendations`)
}

export async function getTVSeasonDetails(id: number, season: number) {
  return fetchTMDB<any>(`/tv/${id}/season/${season}`)
}

export async function getTVEpisodeDetails(id: number, season: number, episode: number) {
  return fetchTMDB<any>(`/tv/${id}/season/${season}/episode/${episode}`, `&append_to_response=credits,external_ids`)
}

export async function searchMulti(query: string, page = 1) {
  return fetchTMDB<any>(`/search/multi`, `&query=${encodeURIComponent(query)}&page=${page}`)
}

export async function getDiscoverMovie(page = 1, genre?: string) {
  const genreParam = genre ? `&with_genres=${genre}` : ""
  return fetchTMDB<any>(`/discover/movie`, `&sort_by=popularity.desc&page=${page}${genreParam}`)
}

export async function getDiscoverTV(page = 1, genre?: string) {
  const genreParam = genre ? `&with_genres=${genre}` : ""
  return fetchTMDB<any>(`/discover/tv`, `&sort_by=popularity.desc&page=${page}${genreParam}`)
}

export function getImageUrl(path: string | null, size = "w500") {
  if (!path) return null
  return `https://image.tmdb.org/t/p/${size}${path}`
}

export function getBackdropUrl(path: string | null) {
  if (!path) return null
  return `https://image.tmdb.org/t/p/original${path}`
}
