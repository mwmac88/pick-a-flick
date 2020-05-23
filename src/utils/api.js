import axios from 'axios';

export default class api {
  async getPopularMovies(pageNumber = 1) {
    return axios(
      `https://${process.env.REACT_APP_TMDB_URL}/movie/popular?&language=en-UK&page=${pageNumber}&api_key=${process.env.REACT_APP_TMDB_APIKEY}`
    );
  }

  async getRecommendedMovies(movieId) {
    return axios(
      `https://${process.env.REACT_APP_TMDB_URL}/movie/${movieId}/recommendations?&language=en-UK&api_key=${process.env.REACT_APP_TMDB_APIKEY}`
    );
  }

  async getMovieInfo(movieId) {
    return axios(
      `https://${process.env.REACT_APP_TMDB_URL}/movie/${movieId}?&language=en-UK&api_key=${process.env.REACT_APP_TMDB_APIKEY}`
    );
  }

  async getAllGenres() {
    return axios(
      `https://${process.env.REACT_APP_TMDB_URL}/genre/movie/list?&language=en-UK&api_key=${process.env.REACT_APP_TMDB_APIKEY}`
    );
  }

  async getTop20RatedWithGenre(genreId) {
    return axios(
      `https://${process.env.REACT_APP_TMDB_URL}/discover/movie?sort_by=popularity.desc&vote_average.gte=7.5&with_genres=${genreId}&language=en-UK&api_key=${process.env.REACT_APP_TMDB_APIKEY}`
    );
  }
}
