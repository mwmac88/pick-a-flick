import React from 'react';

import useGenres from '../../utils/use-genres';

interface FiltersViewProps {
  selectedGenres?: string;
}

const FilterView: React.FC<FiltersViewProps> = ({ selectedGenres }) => {
  const genres = useGenres();
  const splitGenres = selectedGenres?.split(',');

  return (
    <div>
      <h2>Filter by:</h2>
      {genres.map((genre) => (
        <div
          key={genre.id}
          className={
            splitGenres?.includes(genre.id.toString()) ? 'bg-orange-500' : ''
          }
        >
          {genre.name}
        </div>
      ))}
    </div>
  );
};

export default FilterView;
