import { Movie, Status } from '../types';
import { deduplicateMovies } from '../utils/helpers';

export type MoviesActions =
  | { type: 'fetching' }
  | { type: 'success'; payload: { results: Movie[]; page: number } }
  | { type: 'error'; error: Error };

export type MoviesState = {
  movies: Movie[];
  status: Status;
  error: string;
};

export function moviesReducer(
  state: MoviesState,
  action: MoviesActions
): MoviesState {
  switch (action.type) {
    case 'fetching': {
      return { ...state, status: Status.FETCHING, error: '' };
    }
    case 'success': {
      const { results, page } = action.payload;
      const dedupedMovies = deduplicateMovies(results);
      const movies =
        page > 1 ? [...state.movies, ...dedupedMovies] : [...dedupedMovies];

      return {
        status: Status.SUCCESS,
        movies,
        error: '',
      };
    }
    case 'error': {
      return {
        ...state,
        status: Status.ERROR,
        error: action.error.message,
      };
    }
    default: {
      return state;
    }
  }
}
