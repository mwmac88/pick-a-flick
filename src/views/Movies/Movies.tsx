import React, { lazy, Suspense, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { stringify } from 'query-string';
import { navigate } from '@reach/router';

import Loader from '../../components/Loader/Loader';
import SidePanel from '../../components/SidePanel/SidePanel';

import FiltersView from '../FiltersView/FiltersView';

import api from '../../utils/api';
import { genresListIds } from '../../utils/helpers';
import useUrlParams from '../../utils/use-urlparams';
import { useGlobalWindowScroll } from '../../utils/use-window-event';

import { AppActionTypes, MoviesStatus, SortBy } from '../../types';

import { useMovieState, useMoviesDispatch } from '../../contexts/MoviesContext';
import { useAppDispatch } from '../../contexts/AppContext';

const CardsView = lazy(() => import('../CardsView/CardsView'));

interface CardsViewProps {
  path: string;
  isSidePanelOpen: boolean;
}

const Movies: React.FC<CardsViewProps> = ({ isSidePanelOpen }) => {
  const urlParams = useUrlParams();
  const [pageNumber, setPageNumber] = useState(1);
  const { movies, status, error } = useMovieState();

  const appDispatch = useAppDispatch();
  const moviesDispatch = useMoviesDispatch();

  useGlobalWindowScroll(
    debounce(() => {
      if (
        Math.round(window.innerHeight + window.scrollY) >=
        document.body.offsetHeight
      ) {
        loadMoreMovies();
      }
    }, 300)
  );

  useEffect(() => {
    const apiCall = new api();

    async function fetchData() {
      try {
        moviesDispatch({
          type: 'fetching',
        });
        let top20 = await apiCall.getMovies({ ...urlParams }, pageNumber);

        moviesDispatch({
          type: 'success',
          payload: { results: [...top20.data.results], page: pageNumber },
        });
      } catch (error) {
        moviesDispatch({
          type: 'error',
          error: new Error(),
        });
      }
    }

    fetchData();
  }, [urlParams, pageNumber, moviesDispatch]);

  const loadMoreMovies = () => {
    setPageNumber(pageNumber + 1);
  };

  const refreshMovies = () => {
    appDispatch(AppActionTypes.TOGGLE_SIDEPANEL);
    setPageNumber(1);
  };

  const sortMovies = (e: React.FormEvent, sortBy: SortBy) => {
    e.preventDefault();
    const sortByParam = `?${stringify({
      ...urlParams,
      sort_by: sortBy,
    })}`;
    navigate(sortByParam);
  };

  return (
    <>
      <div className='sticky top-0 flex justify-center items-center bg-gray-700 py-4 z-20'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-4'
          onClick={() => appDispatch(AppActionTypes.TOGGLE_SIDEPANEL)}
        >
          Filter
        </button>

        <label className='hidden' htmlFor='sort-by'>
          Sort By:
        </label>
        <div className='relative'>
          <select
            className='block appearance-none w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full'
            id='sort-by'
            name='sortby'
            value={urlParams.sort_by}
            defaultValue={SortBy['Popularity Desc']}
            onChange={(event) => {
              const sortValue: SortBy =
                SortBy[event.target.value as keyof typeof SortBy];
              sortMovies(event, sortValue);
            }}
          >
            {Object.entries(SortBy).map(([name, value]) => (
              <option key={value} value={name}>
                {name}
              </option>
            ))}
          </select>
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white font-bold'>
            <svg
              className='fill-current h-4 w-4'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
            >
              <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
            </svg>
          </div>
        </div>
      </div>
      <SidePanel
        isSidePanelOpen={isSidePanelOpen}
        closeSidePanel={() => appDispatch(AppActionTypes.TOGGLE_SIDEPANEL)}
      >
        <FiltersView
          selectedGenres={genresListIds(urlParams.with_genres)}
          selectedYear={
            urlParams['release_date.gte']
              ? new Date(urlParams['release_date.gte'])
              : new Date(2000, 0, 1)
          }
          applyFilters={() => refreshMovies()}
        />
      </SidePanel>
      <div className='container mx-auto xs:px-4 sm:px-3 md:px-2'>
        {status === MoviesStatus.ERROR && (
          <>
            <h1>An error has occured, please try refreshing the page</h1>
            <p>{error.toString()}</p>
          </>
        )}
        <Suspense
          fallback={<Loader isLoading={status === MoviesStatus.FETCHING} />}
        >
          <CardsView movies={movies} />
        </Suspense>
      </div>
    </>
  );
};

export default Movies;
