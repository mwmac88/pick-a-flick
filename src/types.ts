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
