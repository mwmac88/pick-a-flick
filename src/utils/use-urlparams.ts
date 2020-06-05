import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useLocation } from '@reach/router';

import { MovieParams } from '../types';

export default function useUrlParams(): MovieParams {
  const location = useLocation();
  const [urlParams, setUrlParams] = useState<MovieParams>({});

  useEffect(() => {
    setUrlParams(queryString.parse(location.search));
  }, [location.search]);

  return urlParams;
}
