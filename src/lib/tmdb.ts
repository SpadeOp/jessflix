const TMDB_KEY = '986cbbcc2f29966e58658da1746adfff'
const TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODZjYmJjYzJmMjk5NjZlNTg2NThkYTE3NDZhZGZmZiIsIm5iZiI6MTc3OTI1NzA4MS4xMDUsInN1YiI6IjZhMGQ0ZWY5MzMxNGJhYmU5MGY4ZGNkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7Ua1aJK_W3MnKjIsUE5Y_LWLbPDyOiejt9leJrmqYN8'
const TMDB_IMG = 'https://image.tmdb.org/t/p/'

export const tmdbImg = (path: string, size = 'w500') => path ? `${TMDB_IMG}${size}${path}` : ''

export const poster = (title: string, path?: string) =>
  path
    ? path.startsWith('http') ? path : `${TMDB_IMG}w500${path}`
    : `https://picsum.photos/seed/${title.replace(/\s+/g, '-').toLowerCase()}/300/450`

const tmdbHeaders = { 'Authorization': `Bearer ${TMDB_TOKEN}`, 'accept': 'application/json' }

export const tmdbFetch = async (endpoint: string, ms = 8000) => {
  const ac = new AbortController()
  const t = setTimeout(() => ac.abort(), ms)
  try {
    const r = await fetch(`https://api.themoviedb.org/3${endpoint}`, { headers: tmdbHeaders, signal: ac.signal })
    if (!r.ok) throw new Error(String(r.status))
    return r.json()
  } finally {
    clearTimeout(t)
  }
}
