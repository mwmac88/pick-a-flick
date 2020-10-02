import axios, { AxiosResponse } from 'axios';
import { stringifyUrl, ParsedQuery } from 'query-string';

export default class api {
  async getPopularMovies(pageNumber = 1): Promise<AxiosResponse> {
    return axios(
      `https://${process.env.REACT_APP_TMDB_URL}/movie/popular?&language=en-UK&page=${pageNumber}&api_key=${process.env.REACT_APP_TMDB_APIKEY}`
    );
  }

  async getRecommendedMovies(movieId: number): Promise<AxiosResponse> {
    return axios(
      `https://${process.env.REACT_APP_TMDB_URL}/movie/${movieId}/recommendations?&language=en-UK&api_key=${process.env.REACT_APP_TMDB_APIKEY}`
    );
  }

  async getMovieInfo(movieId: number): Promise<AxiosResponse> {
    return axios(
      `https://${process.env.REACT_APP_TMDB_URL}/movie/${movieId}?&language=en-UK&api_key=${process.env.REACT_APP_TMDB_APIKEY}`
    );
  }

  async getAllGenres(): Promise<AxiosResponse> {
    return axios(
      `https://${process.env.REACT_APP_TMDB_URL}/genre/movie/list?&language=en-UK&api_key=${process.env.REACT_APP_TMDB_APIKEY}`
    );
  }

  async getSearchResults(
    searchQuery: string,
    pageNumber = 1
  ): Promise<AxiosResponse> {
    return axios(
      `https://${process.env.REACT_APP_TMDB_URL}/search/movie?query=${searchQuery}&page=${pageNumber}&language=en-UK&include_adult=false&api_key=${process.env.REACT_APP_TMDB_APIKEY}`
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
      with_original_language: 'en',
      ...urlParams,
    };
    const stringyUrl = stringifyUrl({
      url: `https://${process.env.REACT_APP_TMDB_URL}/discover/movie`,
      query: { ...queryParams },
    });

    return axios(stringyUrl);
  }
}
