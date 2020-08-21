import React from 'react';

interface Props {
  searchInputChange: Function;
}

const Search: React.FC<Props> = ({ searchInputChange }) => {
  const onSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value;
    if (searchValue.length >= 3) {
      searchInputChange(searchValue);
    }
  };
  return (
    <div>
      <input
        className='border-b border-white appearance-none focus:outline-none leading-relaxed bg-transparent text-white text-3xl px-4 py-2'
        type='search'
        placeholder='Search movie title'
        onChange={onSearchChange}
      />
    </div>
  );
};

export default Search;
