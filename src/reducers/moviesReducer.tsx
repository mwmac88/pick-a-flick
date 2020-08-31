import { Movie, MoviesStatus } from '../types';
import { deduplicateMovies } from '../utils/helpers';

export type MoviesActions =
  | { type: 'fetching' }
  | { type: 'success'; payload: Movie[] }
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
      const dedupedMovies = deduplicateMovies(action.payload);
      return {
        status: MoviesStatus.SUCCESS,
        movies: [...state.movies, ...dedupedMovies],
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
