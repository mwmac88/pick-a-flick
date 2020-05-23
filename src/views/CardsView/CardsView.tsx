import React from 'react';
import { Link } from '@reach/router';
import Card from '../../components/Card/Card';

import { Movie } from '../../types';

interface CardsViewProps {
  movies: Array<Movie>;
}

const renderCards = (movies: Array<Movie>) => {
  return movies.map((movie) => (
    <Link to={`/movie/${movie.id}`} key={movie.id} className='h-full'>
      <Card movie={movie} />
    </Link>
  ));
};

const CardsView: React.FC<CardsViewProps> = ({ movies }) => {
  return (
    <div className='container mx-auto xs:px-4 sm:px-3 md:px-2'>
      <div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 row-gap-6 col-gap-4 py-4'>
        {renderCards(movies)}
      </div>
      {/* {isLoading && (
        <div className='static bottom-8 flex justify-center items-center'>
          <span className='flex justify-center items-center w-32 h-32 rounded-full bg-orange-500 text-xl text-center font-bold text-white p-6 leading-snug hover:bg-orange-600 cursor-pointer transform transition-transform hover:scale-125 duration-300 ease-in-out'>
            Loading
          </span>
        </div>
      )} */}
    </div>
  );
};

export default CardsView;
