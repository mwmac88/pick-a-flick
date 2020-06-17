import { Movie } from '../types';

function getRandomNum(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getRandomMovieFromList(movieList: Movie[]): Movie {
  const randomNum = getRandomNum(movieList.length - 1);
  return movieList[randomNum];
}

export function deduplicateMovies(mergedMovies: Array<Movie>) {
  return mergedMovies.reduce((acc: Array<Movie>, movie: Movie) => {
    const movieExists = acc.find((el) => el.id === movie.id);

    if (!movieExists) {
      return [...acc, movie];
    }

    return acc;
  }, []);
}

export function genresListIds(genres?: string): Array<number> {
  return genres ? genres.split(',').map((genreId) => parseInt(genreId)) : [];
}
