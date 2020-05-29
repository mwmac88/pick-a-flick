import axios from 'axios';

import { stringifyUrl } from 'query-string';

interface MovieParams {
  api_key: string;
  language?: string;
  sortBy?: string;
  with_genres?: string;
  'vote_average.gte'?: string;
}

export default class api {
  async getPopularMovies(pageNumber = 1) {
    return axios(
      `https://${process.env.REACT_APP_TMDB_URL}/movie/popular?&language=en-UK&page=${pageNumber}&api_key=${process.env.REACT_APP_TMDB_APIKEY}`
    );
  }

  async getRecommendedMovies(movieId: number) {
    return axios(
      `https://${process.env.REACT_APP_TMDB_URL}/movie/${movieId}/recommendations?&language=en-UK&api_key=${process.env.REACT_APP_TMDB_APIKEY}`
    );
  }

  async getMovieInfo(movieId: number) {
    return axios(
      `https://${process.env.REACT_APP_TMDB_URL}/movie/${movieId}?&language=en-UK&api_key=${process.env.REACT_APP_TMDB_APIKEY}`
    );
  }

  async getAllGenres() {
    return axios(
      `https://${process.env.REACT_APP_TMDB_URL}/genre/movie/list?&language=en-UK&api_key=${process.env.REACT_APP_TMDB_APIKEY}`
    );
  }

  async getMovies(genreIds?: string, voteAverage?: MovieParams['vote_average.gte']) {
    const urlParams: MovieParams = {
      api_key: process.env.REACT_APP_TMDB_APIKEY || '',
      language: 'en-uk',
      with_genres: genreIds,
      'vote_average.gte': voteAverage
    }
    console.log(genreIds);

    const stringyUrl = stringifyUrl({url: `https://${process.env.REACT_APP_TMDB_URL}/discover/movie`, query: { ...urlParams } });

    return axios(stringyUrl);
  }
}
