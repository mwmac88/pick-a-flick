import { Movie } from '../types';

export function getRandomNum(max: number): number {
  const generateRandomNum = () => Math.floor(Math.random() * Math.floor(max));
  const randomNum = generateRandomNum();

  return randomNum > 0 ? randomNum : getRandomNum(max);
}

export function getRandomMovieFromList(movieList: Movie[]): Movie {
  const randomNum = movieList.length > 1 ? getRandomNum(movieList.length) : 1;

  return movieList[randomNum - 1];
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
