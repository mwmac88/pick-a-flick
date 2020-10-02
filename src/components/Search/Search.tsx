import React from 'react';
import { useAppDispatch } from '../../contexts/AppContext';

const Search: React.FC = () => {
  const appDispatch = useAppDispatch();

  const onSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    appDispatch({ type: 'searchterm', payload: e.currentTarget.value });
  };

  return (
    <div>
      <input
        className='border-b border-white appearance-none focus:outline-none leading-relaxed bg-transparent text-white placeholder-white text-3xl px-4 py-2'
        type='search'
        placeholder='Search movie title'
        onChange={onSearchChange}
      />
    </div>
  );
};

export default Search;
