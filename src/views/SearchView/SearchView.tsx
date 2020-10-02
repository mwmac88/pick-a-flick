import { useNavigate } from '@reach/router';
import React, { useEffect } from 'react';
import debounce from 'lodash.debounce';

import SidePanel from '../../components/SidePanel/SidePanel';

import { useAppDispatch, useAppState } from '../../contexts/AppContext';
import {
  useSearchDispatch,
  useSearchState,
} from '../../contexts/SearchContext';

import api from '../../utils/api';
import CardsView from '../CardsView/CardsView';

interface Props {
  path: string;
  isSidePanelOpen: boolean;
}

const SearchView: React.FC<Props> = ({ isSidePanelOpen }) => {
  const appDispatch = useAppDispatch();
  const { searchInput } = useAppState();
  const { searchResults } = useSearchState();
  const navigate = useNavigate();

  const searchDispatch = useSearchDispatch();

  useEffect(() => {
    const apiCall = new api();

    const performSearch = async () => {
      try {
        searchDispatch({ type: 'fetching' });
        const results = await apiCall.getSearchResults(searchInput);

        searchDispatch({
          type: 'success',
          payload: { results: results.data.results, page: results.data.page },
        });
      } catch (error) {
        searchDispatch({ type: 'error', error });
      }
    };

    if (searchInput.length < 1) {
      searchDispatch({
        type: 'clear',
      });
      navigate(-1);
    } else {
      debounce(performSearch, 300);
      performSearch();
    }
  }, [navigate, searchDispatch, searchInput]);

  return (
    <div>
      <SidePanel
        isSidePanelOpen={isSidePanelOpen}
        closeSidePanel={() => appDispatch({ type: 'togglesidepanel' })}
      >
        <h1>Side-panel goes here!</h1>
      </SidePanel>
      <div>
        {!searchResults && <p>No results found please try again</p>}
        {searchResults && <CardsView movies={searchResults} />}
      </div>
    </div>
  );
};

export default SearchView;
