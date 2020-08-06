import React, { useState, useEffect } from 'react';
import { format, startOfYear } from 'date-fns';
import DatePicker from 'react-datepicker';
import { useNavigate } from '@reach/router';
import { stringify } from 'query-string';

import useGenres from '../../utils/use-genres';
import { stripEmpties } from '../../utils/helpers';
import InputSlider from '../../components/InputSlider/InputSlider';

interface FiltersViewProps {
  selectedGenres: number[];
  selectedYear: Date;
  applyFilters: Function;
}

const FilterView: React.FC<FiltersViewProps> = ({
  selectedGenres,
  selectedYear,
  applyFilters,
}) => {
  const navigate = useNavigate();
  const genres = useGenres();

  const [displayGenres, setDisplayGenres] = useState<number[]>([]);
  const [yearFrom, setYearFrom] = useState<Date>(selectedYear);
  const [rating, setRating] = useState<number | number[]>(1);

  const updateDisplayGenres = (genreId: number) => {
    if (displayGenres.includes(genreId)) {
      setDisplayGenres(() =>
        displayGenres.filter((genre) => genre !== genreId)
      );
    } else {
      setDisplayGenres([...displayGenres, genreId]);
    }
  };

  const filterMovies = () => {
    const params = {
      with_genres: displayGenres.join(),
      'release_date.gte': format(yearFrom, 'yyyy-dd-MM'),
      'vote_average.gte': rating.toString(),
    };

    navigate(`?${stringify(stripEmpties(params))}`);
    applyFilters();
  };

  useEffect(() => {
    setDisplayGenres(selectedGenres);
  }, [selectedGenres]);

  return (
    <div className='flex flex-col px-4'>
      <h2 className='text-center'>Filter by</h2>

      <div className='mb-4'>
        <h3 className='font-medium font-body text-lg text-orange-600 mb-2'>
          Genres
        </h3>

        <ul className='flex flex-row flex-wrap list-none'>
          {genres.map((genre) => (
            <li
              key={genre.id}
              className={`cursor-pointer mr-1 mb-1 border border-solid border-orange-600 py-2 px-3 rounded-full text-xs bg-orange-100 
                ${
                  displayGenres.includes(genre.id)
                    ? 'bg-orange-500 hover:bg-orange-300'
                    : 'hover:bg-orange-500 hover:text-white'
                }`}
              onClick={() => updateDisplayGenres(genre.id)}
            >
              {genre.name}
            </li>
          ))}
        </ul>
      </div>

      <div className='border border-solid border-orange-400 w-full my-2'></div>

      <div className='flex flex-col mb-4'>
        <h3 className='font-medium font-body text-lg text-orange-600 mb-2'>
          Release Date
        </h3>
        <h4 className='text-base font-body text-center'>From</h4>
        <DatePicker
          className='border border-orange-500 border-solid text-center font-semibold text-lg rounded w-full p-2 mb-6 cursor-pointer'
          selected={yearFrom}
          onChange={(date: Date) => setYearFrom(date)}
          showYearPicker
          dateFormat='yyyy'
          maxDate={startOfYear(new Date())}
        />
      </div>

      <div className='border border-solid border-orange-400 w-full my-2'></div>

      <div className='flex flex-col mb-4'>
        <h3 className='font-medium font-body text-lg text-orange-600 mb-2'>
          Rating
        </h3>

        <InputSlider
          min={1}
          max={10}
          step={0.5}
          labelText='rating'
          valueChange={(value: number) => setRating(value)}
        />
      </div>

      <div className='border border-solid border-orange-400 w-full my-2'></div>

      <button
        className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full mx-auto'
        onClick={() => filterMovies()}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterView;
