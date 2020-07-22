import React, { lazy, Suspense, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

import SidePanel from '../../components/SidePanel/SidePanel';

import api from '../../utils/api';
import { deduplicateMovies, genresListIds } from '../../utils/helpers';
import { useGlobalWindowScroll } from '../../utils/use-window-event';

import FiltersView from '../FiltersView/FiltersView';

import { Movie } from '../../types';
import useUrlParams from '../../utils/use-urlparams';
import Loader from '../../components/Loader/Loader';
import { stringify } from 'query-string';
import { navigate } from '@reach/router';

const CardsView = lazy(() => import('../CardsView/CardsView'));

enum SortBy {
  'Popluarity Asc' = 'popularity.asc',
  'Popularity Desc' = 'popularity.desc',
  'Release Date Asc' = 'release_date.asc',
  'Release Date Desc' = 'release_date.desc',
  'Rating Asc' = 'vote_average.asc',
  'Rating Desc' = 'vote_average.desc',
  'Revenue Asc' = 'revenue.asc',
  'Revenue Desc' = 'revenue.desc',
  'Title Asc' = 'original_title.asc',
  'Title Desc' = 'original_title.desc',
}

interface CardsViewProps {
  path: string;
  isSidePanelOpen: boolean;
  setSidePanelVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Movies: React.FC<CardsViewProps> = ({
  isSidePanelOpen,
  setSidePanelVisible,
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState<string>(SortBy['Popularity Desc']);
  const urlParams = useUrlParams();

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
        let top20 = await apiCall.getMovies({ ...urlParams }, pageNumber);

        if (pageNumber > 1) {
          setMovies((m) => deduplicateMovies([...m, ...top20.data.results]));
        } else {
          setMovies(() => deduplicateMovies([...top20.data.results]));
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [urlParams, pageNumber, sortBy]);

  const loadMoreMovies = () => {
    setPageNumber(pageNumber + 1);
  };

  const refreshMovies = () => {
    setIsLoading(true);
    setSidePanelVisible(false);
    setPageNumber(1);
  };

  const sortMovies = (e: React.FormEvent, sortBy: SortBy) => {
    e.preventDefault();
    setSortBy(sortBy);
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
          onClick={() => setSidePanelVisible(true)}
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
            onChange={(event) => {
              const sortValue: SortBy =
                SortBy[event.target.value as keyof typeof SortBy];
              sortMovies(event, sortValue);
            }}
          >
            {Object.entries(SortBy).map(([name, value]) => (
              <option value={name} selected={value === sortBy}>
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
        closeSidePanel={() => setSidePanelVisible(false)}
      >
        <FiltersView
          selectedGenres={genresListIds(urlParams.with_genres)}
          applyFilters={() => refreshMovies()}
        />
      </SidePanel>
      <div className='container mx-auto xs:px-4 sm:px-3 md:px-2'>
        <p>UrlParams: {Object.entries(urlParams).map((val) => `${val} &`)}</p>

        <Suspense fallback={<Loader isLoading={isLoading} />}>
          <CardsView movies={movies} />
        </Suspense>
      </div>
    </>
  );
};

export default Movies;
