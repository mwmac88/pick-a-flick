import React, { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { useLocation } from '@reach/router';
import queryString from 'query-string';

import api from '../../utils/api';
import { deduplicateMovies } from '../../utils/helpers';
import { useGlobalWindowScroll } from '../../utils/use-window-event';

import CardsView from '../CardsView/CardsView';

import { Movie, MovieParams } from '../../types';

interface CardsViewProps {
  path: string;
}

const Movies: React.FC<CardsViewProps> = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [urlParams, setUrlParams] = useState<MovieParams>({});
  const location = useLocation();

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
    const parsedUrlParams = queryString.parse(location.search);

    async function fetchData() {
      try {
        let top20 = await apiCall.getMovies(parsedUrlParams, pageNumber);
        setMovies((m) => deduplicateMovies([...m, ...top20.data.results]));
      } finally {
        setIsLoading(false);
        setUrlParams({ ...parsedUrlParams });
      }
    }

    fetchData();
  }, [location.search, pageNumber]);

  const loadMoreMovies = () => {
    setIsLoading(true);
    setPageNumber(pageNumber + 1);
  };

  return (
    <div className='container mx-auto xs:px-4 sm:px-3 md:px-2'>
      <p>UrlParams: {Object.entries(urlParams).map((val) => `${val} &`)}</p>
      <CardsView movies={movies} />
      {isLoading && (
        <div className='static bottom-8 flex justify-center items-center'>
          <span className='flex justify-center items-center w-32 h-32 rounded-full bg-orange-500 text-xl text-center font-bold text-white p-6 leading-snug hover:bg-orange-600 cursor-pointer transform transition-transform hover:scale-125 duration-300 ease-in-out'>
            Loading
          </span>
        </div>
      )}
    </div>
  );
};

export default Movies;
