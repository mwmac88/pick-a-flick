import React, { useState } from 'react';
import { Router, Link } from '@reach/router';
import 'firebase/firestore';

import { ProvideAuth } from './utils/use-auth.js';

import Modal from './components/Modal/Modal';
import Shuffler from './components/Shuffler/Shuffler';
import Login from './components/Auth/Login';

import Movies from './views/Movies/Movies';
import MovieView from './views/MovieView/MovieView';

import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ShuffleIcon from '@material-ui/icons/Shuffle';

const App: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ProvideAuth>
      <header className='flex flex-row items-center bg-orange-400 px-4'>
        <span className='flex-auto text-gray-800 py-2 z-10 hover:text-white'>
          <MenuIcon fontSize='large' className='cursor-pointer' />
        </span>
        <Link to='/' className='flex-auto py-2'>
          <h1 className='text-white text-center sm:py-4 xs:text-4xl sm:text-4xl md:text-5xl'>
            Pick-A-Flick
          </h1>
        </Link>
        <div className='flex flex-auto justify-end'>
          <Link to='/login' className='mr-4'>
            <PersonIcon fontSize='large' className='cursor-pointer' />
          </Link>
          <Link to='/register'>
            <PersonAddIcon fontSize='large' className='cursor-pointer' />
          </Link>
        </div>
      </header>
      <main>
        <Router>
          <Movies path='/' />
          <Movies path='/movies' />
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
