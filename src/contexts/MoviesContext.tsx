import React, { createContext, useReducer } from 'react';
import moviesReducer from '../reducers/moviesReducer';
import { MoviesState, MoviesAction, MoviesStatus } from '../types';

type Dispatch = (action: MoviesAction) => void;

const defaultMovieStatus = {
  movies: [],
  status: MoviesStatus.FETCHING,
  error: '',
};

const MoviesStateContext = createContext<MoviesState | undefined>(undefined);
const MoviesDispatchContext = createContext<Dispatch | undefined>(undefined);

function MoviesProvider({ children }: any) {
  const [state, dispatch] = useReducer(moviesReducer, defaultMovieStatus);

  return (
    <MoviesStateContext.Provider value={state}>
      <MoviesDispatchContext.Provider value={dispatch}>
        {children}
      </MoviesDispatchContext.Provider>
    </MoviesStateContext.Provider>
  );
}

function useMovieState() {
  const context = React.useContext(MoviesStateContext);
  if (context === undefined) {
    throw new Error('MoviesStateContext must be used within a MoviesProvider');
  }

  return context;
}

function useMoviesDispatch() {
  const context = React.useContext(MoviesDispatchContext);
  if (context === undefined) {
    throw new Error('useCountDispatch must be used within a CountProvider');
  }

  return context;
}

export { MoviesProvider, useMovieState, useMoviesDispatch };
