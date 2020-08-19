import React, { useState } from 'react';
import { Link } from '@reach/router';
import { format, startOfYear } from 'date-fns';
import DatePicker from 'react-datepicker';

import Card from '../Card/Card';

import api from '../../utils/api';
import useGenres from '../../utils/use-genres';
import { getRandomMovieFromList, getRandomNum } from '../../utils/helpers';
import { Genre, Movie } from '../../types';

import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Shuffler: React.FC<Props> = ({ setModalVisible }) => {
  const [radioSelected, setRadioSelected] = useState({} as Genre);
  const [yearFrom, setYearFrom] = useState(startOfYear(new Date()));
  const [isOnlyPopular, setIsOnlyPopular] = useState(false);
  const [movieResult, setMovieResult] = useState({} as Movie);
  const [noResults, setNoResults] = useState(false);
  const genres = useGenres();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const getRandomMovieResult = () => {
    const apiCall = new api();

    const options = {
      with_genres: radioSelected.id.toString(),
      sort_by: 'popularity.desc',
      'primary_release_date.gte': format(yearFrom, 'yyyy-dd-MM'),
      'vote_average.gte': '7',
      'vote_count.gte': '150',
    };

    const genreResults = async () => {
      const initialMovieList = await apiCall.getMovies(options);

      if (initialMovieList.data.total_results === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
        const totalPages = initialMovieList.data.total_pages;

        const randompageNum =
          totalPages === 1
            ? 1
            : getRandomNum(
                isOnlyPopular ? 3 : initialMovieList.data.total_pages
              );

        const randompageMovieList = await apiCall.getMovies(
          options,
          randompageNum
        );

        setMovieResult(
          getRandomMovieFromList(randompageMovieList.data.results)
        );
      }
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

      {radioSelected.id && (
        <h3>
          Selected Genre:{' '}
          <span className='text-green-400 font-semibold'>
            {radioSelected.name}
          </span>
        </h3>
      )}

      <label>Year from: </label>
      <DatePicker
        className='border border-orange-500 border-solid text-center font-semibold text-lg rounded w-full p-2 mb-6 cursor-pointer'
        selected={yearFrom}
        onChange={(date: Date) => setYearFrom(date)}
        showYearPicker
        dateFormat='yyyy'
      />

      <div className='divide-y-2 divide-orange-400'></div>

      <label>Show only popular:</label>
      <input
        type='checkbox'
        checked={isOnlyPopular}
        onChange={() => setIsOnlyPopular(!isOnlyPopular)}
      />

      {noResults && <p>No Flicks Found. Try again!</p>}

      {movieResult && Object.keys(movieResult).length === 0 && (
        <>
          <form
            className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-3 my-8'
            onSubmit={handleSubmit}
          >
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

      {!noResults && movieResult && movieResult.id && (
        <>
          <h3>Your Selected Random Movie Is:</h3>
          <div className='grid xs:grid-cols-1 sm:grid-cols-2 col-gap-12 w-full md:w-2/3 py-4 mx-auto'>
            <Link
              to={`/movie/${movieResult.id}`}
              onClick={() => setModalVisible(false)}
            >
              <Card movie={movieResult} />
            </Link>
            <div className='flex flex-col my-auto'>
              <button
                className={
                  'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex-1 my-4 md:my-0 md:mb-8'
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
