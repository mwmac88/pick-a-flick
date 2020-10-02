import { Movie, Status } from '../types';

export type SearchActions =
  | { type: 'fetching' }
  | { type: 'success'; payload: { results: Movie[]; page: number } }
  | { type: 'error'; error: Error }
  | { type: 'clear' };

export type SearchState = {
  searchResults: Movie[];
  status: Status;
  error: string;
};

export function searchReducer(
  state: SearchState,
  action: SearchActions
): SearchState {
  switch (action.type) {
    case 'fetching': {
      return { ...state, status: Status.FETCHING, error: '' };
    }
    case 'success': {
      const { results, page } = action.payload;
      const movies =
        page > 1 ? [...state.searchResults, ...results] : [...results];

      return {
        searchResults: movies,
        status: Status.SUCCESS,
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
    case 'clear': {
      return {
        searchResults: [],
        status: Status.SUCCESS,
        error: '',
      };
    }
    default: {
      return state;
    }
  }
}
