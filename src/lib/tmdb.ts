const API_KEY = "986cbbcc2f29966e58658da1746adfff"
const BASE = "https://api.themoviedb.org/3"
const IMG = "https://image.tmdb.org/t/p/"
const TIMEOUT = 5000

async function fetchJson(url: string) {
  const ctrl = new AbortController()
  const id = setTimeout(() => ctrl.abort(), TIMEOUT)
  try {
    const r = await fetch(url, { signal: ctrl.signal })
    clearTimeout(id)
    if (!r.ok) throw new Error(`${r.status}`)
    return await r.json()
  } catch (e) {
    clearTimeout(id)
    throw e
  }
}

export async function tmdbFetch(endpoint: string) {
  return fetchJson(`${BASE}${endpoint}${endpoint.includes("?") ? "&" : "?"}api_key=${API_KEY}&language=en-US`)
}

export async function tmdbFetchAll(endpoints: string[]) {
  const results = await Promise.allSettled(endpoints.map(e => tmdbFetch(e)))
  return results.map(r => r.status === "fulfilled" ? r.value : null)
}

export async function discoverMovies(page = 1) {
  return tmdbFetch(`/discover/movie?sort_by=popularity.desc&page=${page}`)
}

export async function getMovie(id: number) {
  return tmdbFetch(`/movie/${id}?append_to_response=credits,recommendations`)
}

export async function getTV(id: number) {
  return tmdbFetch(`/tv/${id}?append_to_response=credits,recommendations`)
}

export async function searchMulti(query: string) {
  return tmdbFetch(`/search/multi?query=${encodeURIComponent(query)}`)
}

export async function getTrending() {
  return tmdbFetch(`/trending/all/week`)
}

export async function getPopular() {
  return tmdbFetch(`/movie/popular`)
}

export async function getTopRated() {
  return tmdbFetch(`/movie/top_rated`)
}

export async function getNowPlaying() {
  return tmdbFetch(`/movie/now_playing`)
}

export async function getUpcoming() {
  return tmdbFetch(`/movie/upcoming`)
}

export async function getTVPopular() {
  return tmdbFetch(`/tv/popular`)
}

export async function getTVTopRated() {
  return tmdbFetch(`/tv/top_rated`)
}

export async function getGenres() {
  return tmdbFetch(`/genre/movie/list`)
}

export function imgUrl(path: string, size = "w500") {
  if (!path) return "/placeholder.svg"
  return `${IMG}${size}${path}`
}

export function imgOriginal(path: string) {
  if (!path) return "/placeholder.svg"
  return `${IMG}original${path}`
}
