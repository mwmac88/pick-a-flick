import { useEffect, useState } from 'react';

import api from './api';

import { Genre } from '../types';

export default function useGenres() {
  const [genres, setGenres] = useState([] as Genre[]);

  useEffect(() => {
    const apiCall = new api();
    const fetchGenres = async () => {
      const retrieveGenres = await apiCall.getAllGenres();
      setGenres(retrieveGenres.data.genres);
    };
    fetchGenres();
  }, []);

  return genres;
}
