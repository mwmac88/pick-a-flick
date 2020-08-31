export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
}

export enum MoviesStatus {
  FETCHING = 'fetching',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface MovieDetails {
  backdrop_path: string;
  genres: Array<Genre>;
  overview: string;
  release_date: string;
  runtime: number;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

export enum SortBy {
  'Popluarity Asc' = 'popularity.asc',
  'Popularity Desc' = 'popularity.desc',
  'Release Date Asc' = 'release_date.asc',
  'Release Date Desc' = 'release_date.desc',
  'Rating Asc' = 'vote_average.asc',
  'Rating Desc' = 'vote_average.desc',
  'Revenue Asc' = 'revenue.asc',
  'Revenue Desc' = 'revenue.desc',
  'Title Asc' = 'original_title.asc',
  'Title Desc' = 'original_title.desc',
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

export type APIResults = {
  page: number;
  total_results: number;
  total_pages: number;
  results: Movie[];
};

export enum AppActionTypes {
  TOGGLE_SIDEPANEL = 'togglesidepanel',
  TOGGLE_MODAL = 'togglemodal',
}
