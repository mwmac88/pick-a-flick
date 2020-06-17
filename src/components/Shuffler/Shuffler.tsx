import React, { useState } from 'react';
import { Link } from '@reach/router';

import Card from '../Card/Card';

import api from '../../utils/api';
import useGenres from '../../utils/use-genres';
import { getRandomMovieFromList } from '../../utils/helpers';
import { Genre, Movie } from '../../types';

interface Props {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Shuffler: React.FC<Props> = ({ setModalVisible }) => {
  const [radioSelected, setRadioSelected] = useState({} as Genre);
  const [movieResult, setMovieResult] = useState({} as Movie);
  const genres = useGenres();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const getRandomMovieResult = () => {
    const apiCall = new api();
    const genreResults = async () => {
      const moviesInGenre = await apiCall.getMovies(
        {
          with_genres: radioSelected.id.toString(),
        },
        Math.floor(Math.random() * 40) + 1
      );
      setMovieResult(getRandomMovieFromList(moviesInGenre.data.results));
    };
    genreResults();
  };

  const radioSelect = (selectedItem: Genre) => {
    setRadioSelected(selectedItem);
  };

  const renderRadios = <T extends Genre[]>(items: T) =>
    items.map((item: Genre) => {
      return (
        <div
          className={`flex items-center justify-center w-full min-h-16 border-solid border-2 hover:bg-orange-600 cursor-pointer ${
            item.id === radioSelected.id
              ? 'bg-orange-600 border-black'
              : 'border-orange-600 bg-orange-200'
          }`}
          key={item.id}
          onClick={() => radioSelect(item)}
        >
          <input
            type='radio'
            id={item.name}
            name='category'
            value={item.name}
            className='mr-3 hidden'
            checked={item.id === radioSelected.id}
            onChange={() => radioSelect(item)}
          />
          <label className='cursor-pointer' htmlFor={item.name}>
            {item.name}
          </label>
        </div>
      );
    });

  return (
    <div className='m-6'>
      <h2>Movie Roulette</h2>

      {movieResult && Object.keys(movieResult).length === 0 && (
        <>
          <form className='grid grid-cols-4 gap-3 my-8' onSubmit={handleSubmit}>
            {renderRadios(genres)}
          </form>
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
              Object.keys(radioSelected).length === 0
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            onClick={() => getRandomMovieResult()}
            disabled={Object.keys(radioSelected).length === 0}
          >
            Get Flick
          </button>
        </>
      )}

      {movieResult && movieResult.id && (
        <>
          <h3>Your Selected Random Movie Is:</h3>
          <div className='w-2/3 grid xs:grid-cols-1 sm:grid-cols-2 col-gap-12 py-4 mx-auto'>
            <Link
              to={`/movie/${movieResult.id}`}
              onClick={() => setModalVisible(false)}
            >
              <Card movie={movieResult} />
            </Link>
            <div className='flex flex-col my-auto'>
              <button
                className={
                  'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-1 mb-8'
                }
                onClick={() => getRandomMovieResult()}
              >
                Pick again
              </button>
              <button
                className={
                  'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 flex-1 rounded'
                }
                onClick={() => setMovieResult({} as Movie)}
              >
                Choose category
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Shuffler;
