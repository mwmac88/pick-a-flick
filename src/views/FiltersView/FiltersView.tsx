import React, { useState, useEffect } from 'react';
import { useNavigate } from '@reach/router';
import { stringify } from 'query-string';

import { MovieParams } from '../../types';

import useGenres from '../../utils/use-genres';

interface FiltersViewProps {
  selectedGenres: number[];
  applyFilters: Function;
}

const FilterView: React.FC<FiltersViewProps> = ({
  selectedGenres,
  applyFilters,
}) => {
  const navigate = useNavigate();
  const genres = useGenres();

  const [displayGenres, setDisplayGenres] = useState<number[]>([]);

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
    const params: MovieParams = {
      with_genres: displayGenres.join(),
    };
    const newUrlWithParams = `?${stringify(params)}`;
    navigate(newUrlWithParams);
    applyFilters();
  };

  useEffect(() => {
    setDisplayGenres(selectedGenres);
  }, [selectedGenres]);

  return (
    <div>
      <h2>Filter by:</h2>
      {displayGenres}
      {genres.map((genre) => (
        <div
          key={genre.id}
          className={`cursor-pointer
            ${
              displayGenres.includes(genre.id)
                ? 'bg-orange-500 hover:bg-orange-300'
                : 'hover:bg-orange-500'
            }`}
          onClick={() => updateDisplayGenres(genre.id)}
        >
          {genre.name}
        </div>
      ))}

      <button
        className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full'
        onClick={() => filterMovies()}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterView;
