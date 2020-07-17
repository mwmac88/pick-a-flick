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

const CardsView = lazy(() => import('../CardsView/CardsView'));

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
  }, [urlParams, pageNumber]);

  const loadMoreMovies = () => {
    setPageNumber(pageNumber + 1);
  };

  const refreshMovies = () => {
    setIsLoading(true);
    setSidePanelVisible(false);
    setPageNumber(1);
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
