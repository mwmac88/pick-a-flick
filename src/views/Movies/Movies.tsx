import React, { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

import SidePanel from '../../components/SidePanel/SidePanel';

import api from '../../utils/api';
import { deduplicateMovies, genresListIds } from '../../utils/helpers';
import { useGlobalWindowScroll } from '../../utils/use-window-event';

import CardsView from '../CardsView/CardsView';
import FiltersView from '../FiltersView/FiltersView';

import { Movie } from '../../types';
import useUrlParams from '../../utils/use-urlparams';

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
        setMovies((m) => deduplicateMovies([...m, ...top20.data.results]));
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [urlParams, pageNumber]);

  const loadMoreMovies = () => {
    setIsLoading(true);
    setPageNumber(pageNumber + 1);
  };

  return (
    <>
      <div className='sticky top-0 flex justify-center items-center bg-gray-700 py-4 z-20'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
          onClick={() => setSidePanelVisible(true)}
        >
          Filter
        </button>
      </div>
      <SidePanel
        isSidePanelOpen={isSidePanelOpen}
        closeSidePanel={() => setSidePanelVisible(false)}
      >
        <FiltersView selectedGenres={genresListIds(urlParams.with_genres)} />
      </SidePanel>
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
    </>
  );
};

export default Movies;
