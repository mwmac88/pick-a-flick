import React from 'react';
import { format } from 'date-fns';
import { Movie } from '../../types';
import LazyImage from '../LazyImage/LazyImage';

interface Props {
  movie: Movie;
}

const Card: React.FC<Props> = ({ movie }) => {
  const {
    title,
    vote_average: score,
    poster_path: imageUrl,
    release_date,
  } = movie;
  const imgUrl = `https://${process.env.REACT_APP_TMDB_POSTER_URL}${imageUrl}`;

  return (
    <div className='relative flex flex-col items-center h-full shadow-lg bg-orange-100 border-solid border-2 border-gray-200 px-2 py-3 transition-colors duration-300 ease-in-out hover:border-orange-500'>
      <span className='flex justify-center items-center absolute -top-2 -right-2 w-8 h-8 rounded-full bg-orange-500 text-xl font-bold text-white p-6 shadow-lg border-solid border-2 border-white'>
        {score}
      </span>

      <LazyImage
        className='w-full mb-2'
        imgSrc={imgUrl}
        alt='Movie Thumbnail'
        height='290'
        width='380'
      />

      <div className='flex justify-center text-center min-h-12 h-auto py-2'>
        <p className='text-gray-700 text-lg font-medium leading-tight'>
          {title}
          {release_date && release_date !== '' && (
            <span className='font-light italic'>
              ({format(new Date(release_date), 'yyyy')})
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Card;
