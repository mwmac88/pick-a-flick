import { Movie, MoviesStatus } from '../types';
import { deduplicateMovies } from '../utils/helpers';

export type MoviesActions =
  | { type: 'fetching' }
  | { type: 'success'; payload: { results: Movie[]; page: number } }
  | { type: 'error'; error: Error };

export type MoviesState = {
  movies: Movie[];
  status: MoviesStatus;
  error: string;
};

export function moviesReducer(
  state: MoviesState,
  action: MoviesActions
): MoviesState {
  switch (action.type) {
    case 'fetching': {
      return { ...state, status: MoviesStatus.FETCHING, error: '' };
    }
    case 'success': {
      const { results, page } = action.payload;
      const dedupedMovies = deduplicateMovies(results);
      const movies =
        page > 1 ? [...state.movies, ...dedupedMovies] : [...dedupedMovies];

      return {
        status: MoviesStatus.SUCCESS,
        movies,
        error: '',
      };
    }
    case 'error': {
      return {
        ...state,
        status: MoviesStatus.ERROR,
        error: action.error.message,
      };
    }
    default: {
      return state;
    }
  }
}
