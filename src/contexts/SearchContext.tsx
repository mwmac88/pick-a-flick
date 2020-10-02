import React, { createContext, useReducer } from 'react';
import {
  SearchActions,
  SearchState,
  searchReducer,
} from '../reducers/searchReducer';
import { Status } from '../types';

type Dispatch = (action: SearchActions) => void;

const defaultSearchStatus: SearchState = {
  searchResults: [],
  status: Status.FETCHING,
  error: '',
};

const SearchStateContext = createContext<SearchState | undefined>(undefined);
const SearchDispatchContext = createContext<Dispatch | undefined>(undefined);

function SearchProvider({ children }: any) {
  const [state, dispatch] = useReducer(searchReducer, defaultSearchStatus);

  return (
    <SearchStateContext.Provider value={state}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchStateContext.Provider>
  );
}

function useSearchState() {
  const context = React.useContext(SearchStateContext);
  if (context === undefined) {
    throw new Error('useSearchState must be used within a StateProvider');
  }

  return context;
}

function useSearchDispatch() {
  const context = React.useContext(SearchDispatchContext);
  if (context === undefined) {
    throw new Error('useSearchDispatch must be used within a StateProvider');
  }

  return context;
}

export { SearchProvider, useSearchState, useSearchDispatch };
