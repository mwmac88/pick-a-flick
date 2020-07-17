import React from "react";
import { useImage } from "../../utils/use-image";
import Loader from '../Loader/Loader';

interface Props {
  className: string;
  imgSrc: string;
  alt: string;
  width: string;
  height: string;
}

const LazyImage: React.FC<Props> = ({ imgSrc, alt, ...props }) => {
  const { hasLoaded, hasError } = useImage(imgSrc);

  if (hasError) {
    return null;
  }

  return (
    <>
      {!hasLoaded && <Loader isLoading />  }
      {hasLoaded && <img src={imgSrc} alt={alt} {...props} />}
    </>
  );
};

export default LazyImage;
