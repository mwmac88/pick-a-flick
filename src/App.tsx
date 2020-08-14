import React, { useEffect, useState } from 'react';
import { Router, Link } from '@reach/router';
import 'firebase/firestore';

import { ProvideAuth } from './utils/use-auth.js';

import Modal from './components/Modal/Modal';
import Shuffler from './components/Shuffler/Shuffler';
import Login from './components/Auth/Login';

import Movies from './views/Movies/Movies';
import MovieView from './views/MovieView/MovieView';

import ShuffleIcon from '@material-ui/icons/Shuffle';

const App: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [sidePanelVisible, setSidePanelVisible] = useState(false);

  useEffect(() => {
    sidePanelVisible
      ? document.body.classList.add('overflow-y-hidden')
      : document.body.classList.remove('overflow-y-hidden');
  }, [sidePanelVisible]);

  return (
    <ProvideAuth>
      <header className='flex flex-row items-center bg-orange-400 px-4'>
        <Link to='/' className='flex-auto py-2'>
          <h1 className='text-white text-center sm:py-4 xs:text-4xl sm:text-4xl md:text-5xl'>
            Pick-A-Flick
          </h1>
        </Link>
      </header>
      <main>
        <Router>
          <Movies
            path='/'
            isSidePanelOpen={sidePanelVisible}
            setSidePanelVisible={setSidePanelVisible}
          />
          <Movies
            path='/movies'
            isSidePanelOpen={sidePanelVisible}
            setSidePanelVisible={setSidePanelVisible}
          />
          <MovieView path='movie/:movieId' movieId={0} />
          <Login path='/login' />
        </Router>
        <div className='fixed bottom-8 right-8 flex justify-center items-center'>
          <span
            onClick={() => setModalVisible(!modalVisible)}
            className='h-20 rounded-full bg-orange-500 text-center font-bold text-white p-4 leading-snug hover:bg-orange-600 cursor-pointer transform transition-transform hover:scale-125 duration-300 ease-in-out'
          >
            <ShuffleIcon
              className='cursor-pointer mx-auto'
              style={{ display: 'flex', width: '40px', height: '40px' }}
            />
          </span>
        </div>
        {modalVisible && (
          <Modal setModalVisible={setModalVisible}>
            <Shuffler setModalVisible={setModalVisible} />
          </Modal>
        )}
      </main>
    </ProvideAuth>
  );
};

export default App;
