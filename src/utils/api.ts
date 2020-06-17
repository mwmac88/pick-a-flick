import axios, { AxiosResponse } from 'axios';
import { stringifyUrl, ParsedQuery } from 'query-string';

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

  async getMovies(
    urlParams: ParsedQuery,
    pageNumber: number = 1
  ): Promise<AxiosResponse> {
    const queryParams = {
      api_key: process.env.REACT_APP_TMDB_APIKEY,
      include_adult: 'false',
      language: 'en-uk',
      page: pageNumber.toString(),
      ...urlParams,
    };
    const stringyUrl = stringifyUrl({
      url: `https://${process.env.REACT_APP_TMDB_URL}/discover/movie`,
      query: { ...queryParams },
    });

    return axios(stringyUrl);
  }
}
