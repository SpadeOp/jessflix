export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  genre_ids: number[]
  media_type?: string
}

export interface TVShow {
  id: number
  name: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  first_air_date: string
  vote_average: number
  genre_ids: number[]
  media_type?: string
}

export interface TMDBResponse {
  page: number
  results: (Movie | TVShow)[]
  total_pages: number
  total_results: number
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[]
  runtime: number
  tagline: string
  status: string
  credits: {
    cast: { id: number; name: string; character: string; profile_path: string | null }[]
  }
  videos: {
    results: { key: string; site: string; type: string }[]
  }
  similar?: TMDBResponse
  recommendations?: TMDBResponse
  external_ids: {
    imdb_id: string | null
  }
}

export interface TVShowDetails extends TVShow {
  genres: { id: number; name: string }[]
  number_of_seasons: number
  number_of_episodes: number
  tagline: string
  status: string
  seasons: TVSeason[]
  credits: {
    cast: { id: number; name: string; character: string; profile_path: string | null }[]
  }
  external_ids: {
    imdb_id: string | null
  }
}

export interface TVSeason {
  id: number
  name: string
  season_number: number
  episode_count: number
  overview: string
  poster_path: string | null
  air_date: string
}

export interface TVEpisode {
  id: number
  name: string
  overview: string
  still_path: string | null
  air_date: string
  episode_number: number
  season_number: number
  vote_average: number
  crew: { job: string; name: string }[]
  guest_stars: { name: string; character: string; profile_path: string | null }[]
}

export interface Genre {
  id: number
  name: string
}

export interface Provider {
  provider_id: number
  provider_name: string
  logo_path: string
}
