import { MoviesAction, MoviesState, MoviesStatus } from '../types';
import { deduplicateMovies } from '../utils/helpers';

function moviesReducer(state: MoviesState, action: MoviesAction): MoviesState {
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

export default moviesReducer;
