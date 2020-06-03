import React from 'react';

interface FilterProps {
  title: String;
}

const Filter: React.FC<FilterProps> = ({ title }) => {
  return (
    <div className='flex flex-col'>
      <h2 className='text-2xl font-light'>{title}</h2>
    </div>
  );
};

export default Filter;
