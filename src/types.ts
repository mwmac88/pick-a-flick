export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
}

export interface MovieDetails {
  backdrop_path: string;
  genres: Array<Genre>;
  overview: string;
  releaseDate: string;
  runtime: number;
  tagline: string;
  title: string;
}

enum SortBy {
  'vote_average.asc',
  'vote_average.desc',
}

export interface MovieParams {
  sort_by?: SortBy;
  with_genres?: string;
  'vote_average.gte'?: string;
  'vote_average.lte'?: string;
  'release_date.gte'?: string;
  'release_date.lte'?: string;
  year?: string;
}
