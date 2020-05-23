import React, { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { useNavigate, useLocation } from '@reach/router';

import api from '../../utils/api';
import { deduplicateMovies } from '../../utils/helpers';
import { useGlobalWindowScroll } from '../../utils/use-window-event';

import CardsView from '../CardsView/CardsView';

import { Movie } from '../../types';

interface CardsViewProps {
  path: string;
}

const Movies: React.FC<CardsViewProps> = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);

  useGlobalWindowScroll(
    debounce(() => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMoreMovies();
      }
    }, 300)
  );

  useEffect(() => {
    const apiCall = new api();

    async function fetchData() {
      try {
        let top20 = await apiCall.getPopularMovies(page);
        setMovies((m) => {
          const mergeMovies = [...m, ...top20.data.results];
          return deduplicateMovies(mergeMovies);
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [page]);

  const loadMoreMovies = () => {
    setIsLoading(true);
    setPage(page + 1);
  };

  return (
    <div className='container mx-auto xs:px-4 sm:px-3 md:px-2'>
      <button
        onClick={() => {
          navigate('?genres=action');
        }}
      >
        Action
      </button>
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
