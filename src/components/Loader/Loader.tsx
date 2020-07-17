import React from 'react';

import BounceLoader from 'react-spinners/BounceLoader';

interface LoadingProps {
  isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  return <BounceLoader loading={isLoading} size={120} color={'#4A5568'} />;
};

export default Loading;
