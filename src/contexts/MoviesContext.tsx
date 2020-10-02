import React, { createContext, useReducer } from 'react';
import {
  MoviesState,
  MoviesActions,
  moviesReducer,
} from '../reducers/moviesReducer';
import { Status } from '../types';

type Dispatch = (action: MoviesActions) => void;

const defaultMovieStatus: MoviesState = {
  movies: [],
  status: Status.FETCHING,
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
    throw new Error('useMovieState must be used within a MoviesProvider');
  }

  return context;
}

function useMoviesDispatch() {
  const context = React.useContext(MoviesDispatchContext);
  if (context === undefined) {
    throw new Error('useMoviesDispatch must be used within a MoviesProvider');
  }

  return context;
}

export { MoviesProvider, useMovieState, useMoviesDispatch };
