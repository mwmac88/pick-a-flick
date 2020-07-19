import React, { useEffect, useState } from "react";
import { Link, RouteComponentProps } from "@reach/router";

import api from "../../utils/api";
import Card from "../../components/Card/Card";

import { Genre, Movie, MovieDetails } from "../../types";

const mockMovieDetails = {
  backdrop_path: "",
  genres: [
    {
      id: 0,
      name: "",
    },
  ],
  overview: "",
  release_date: "",
  runtime: 0,
  tagline: "",
  title: "",
  vote_count: 0,
};

interface MovieViewProps extends RouteComponentProps {
  path: string;
  movieId: number;
}

const MovieView: React.FC<MovieViewProps> = ({ movieId }) => {
  const [movieInfo, setMovieInfo] = useState<MovieDetails>(mockMovieDetails);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const apiCall = new api();

    async function fetchData() {
      try {
        const movieInfoResults = await apiCall.getMovieInfo(movieId);
        const recommendedMovieResults = await apiCall.getRecommendedMovies(
          movieId
        );

        setMovieInfo(movieInfoResults.data);
        setRecommendedMovies(recommendedMovieResults.data.results);
      } catch (err) {
        console.error("Unable to get movie info:", err);
      }
    }

    fetchData();
  }, [movieId]);

  return (
    <>
      <div
        className="relative flex flex-col justify-center items-center bg-fixed bg-cover bg-center h-screen md:h-header-cover"
        style={{
          backgroundImage: movieInfo.backdrop_path
            ? `url(https://${process.env.REACT_APP_TMDB_BACKDROP_URL}${movieInfo.backdrop_path})`
            : "",
        }}
      >
        <span className="absolute top-0 left-0 bg-gray-700 opacity-90 w-full min-h-full"></span>
        <div className="flex flex-col md:w-3/4 h-full justify-center py-8 z-10">
          <h1 className="text-white text-center py-2 px-6">
            {movieInfo.title}
          </h1>
          <div className="flex flex-col md:flex-row justify-center items-center">
            {movieInfo.genres.map((genre: Genre) => (
              <Link
                to={`/movies/?with_genres=${genre.id}`}
                key={genre.id}
                className="bg-blue-500 hover:bg-blue-700 md:text-lg text-white py-2 px-4 rounded-full mx-1 mb-2 md:mb-0"
              >
                {genre.name}
              </Link>
            ))}
          </div>
          {movieInfo.tagline && (
            <h2 className="text-white text-base md:text-2xl font-body font-light italic text-center py-2 px-6">
              {movieInfo.tagline}
            </h2>
          )}
        </div>
      </div>
      <div className="bg-gray-800 py-16 px-2">
        <h3 className="font-body font-medium text-xl text-center text-white md:w-9/12 xl:w-8/12 mx-auto">
          {movieInfo.overview}
        </h3>
      </div>
      <div className="bg-white py-10 px-2 ">
        <h3 className="font-body font-bold text-center text-gray-700 md:w-9/12 xl:w-8/12 mx-auto">
          Flick Facts
        </h3>
        <div className="flex justify-center items-center">
          {movieInfo.release_date && (
            <span className="bg-orange-500 text-xl text-white py-2 px-4 rounded-full mx-1">
              {new Date(movieInfo.release_date).toLocaleDateString("en-GB", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
        </div>
      </div>
      <div className="bg-orange-400 py-6 px-2">
        <h2 className="font-medium text-center text-white md:w-9/12 xl:w-8/12 mx-auto mb-4">
          Like this flick? You may also like these...
        </h2>
        <div className="w-3/4 flex flex-row flex-no-wrap overflow-x-scroll mx-auto py-4">
          {recommendedMovies.map((movie: Movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="w-3/4 md:w-45 lg:w-30 flex-none h-full px-2"
            >
              <Card movie={movie}></Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieView;
