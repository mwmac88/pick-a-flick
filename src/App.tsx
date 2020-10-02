import React, { useEffect } from 'react';
import { Router, Link, navigate } from '@reach/router';
import 'firebase/firestore';

import { ReactComponent as TMDBLogo } from './images/tmdblogo.svg';

import { ProvideAuth } from './utils/use-auth.js';

import Modal from './components/Modal/Modal';
import Shuffler from './components/Shuffler/Shuffler';
// import Login from './components/Auth/Login';

import MoviesView from './views/MoviesView/MoviesView';
import MovieView from './views/MovieView/MovieView';

import ShuffleIcon from '@material-ui/icons/Shuffle';

import { useAppDispatch, useAppState } from './contexts/AppContext';
import { MoviesProvider } from './contexts/MoviesContext';
import { SearchProvider } from './contexts/SearchContext';

import Search from './components/Search/Search';
import SearchView from './views/SearchView/SearchView';

const App: React.FC = () => {
  const appDispatch = useAppDispatch();
  const { isModalVisible, isSidePanelOpen, searchInput } = useAppState();

  useEffect(() => {
    const isSearchPage = window.location.pathname.startsWith('/search');

    if (!isSearchPage && searchInput.length > 0) {
      navigate(`/search`);
    }
  }, [searchInput]);

  useEffect(() => {
    isSidePanelOpen || isModalVisible
      ? document.body.classList.add('overflow-y-hidden')
      : document.body.classList.remove('overflow-y-hidden');
  }, [isSidePanelOpen, isModalVisible]);

  return (
    <ProvideAuth>
      <header className='flex flex-row items-center bg-orange-400 px-4'>
        <Link to='/' className='flex-auto py-2'>
          <h1 className='text-white text-center sm:py-4 xs:text-4xl sm:text-4xl md:text-5xl'>
            Pick-A-Flick
          </h1>
        </Link>
        <Search />
      </header>
      <main>
        <MoviesProvider>
          <Router>
            <MoviesView path='/' isSidePanelOpen={isSidePanelOpen} />
            <MoviesView path='/movies' isSidePanelOpen={isSidePanelOpen} />
            <MovieView path='movie/:movieId' movieId={0} />
            {/* <Login path='/login' /> */}
          </Router>
        </MoviesProvider>
        <SearchProvider>
          <Router>
            <SearchView path='/search' isSidePanelOpen={isSidePanelOpen} />
          </Router>
        </SearchProvider>
        <div className='fixed bottom-8 right-8 flex justify-center items-center'>
          <span
            onClick={() => appDispatch({ type: 'togglemodal' })}
            className='h-20 rounded-full bg-orange-500 text-center font-bold text-white p-4 leading-snug hover:bg-orange-600 cursor-pointer transform transition-transform hover:scale-125 duration-300 ease-in-out'
          >
            <ShuffleIcon
              className='cursor-pointer mx-auto'
              style={{ display: 'flex', width: '40px', height: '40px' }}
            />
          </span>
        </div>
        {isModalVisible && (
          <Modal setModalVisibilty={() => appDispatch({ type: 'togglemodal' })}>
            <Shuffler
              setModalVisibilty={() => appDispatch({ type: 'togglemodal' })}
            />
          </Modal>
        )}
      </main>
      <footer className='flex flex-col md:flex-row fixed bottom-0 left-0 items-center justify-center h-10 bg-orange-200 px-4 w-full'>
        <p className='text-xxs md:text-xs text-center leading-tight'>
          This product uses the TMDb API but is not endorsed or certified by
          TMDb.
        </p>
        <a href='https://www.themoviedb.org/' className='my-1 md:my-0 md:ml-2'>
          <TMDBLogo className='w-24 md:h-8' />
        </a>
      </footer>
    </ProvideAuth>
  );
};

export default App;
