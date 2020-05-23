import { useEffect } from 'react';

export const useWindowEvent = (event: string, callback: any) => {
  useEffect(() => {
    window.addEventListener(event, callback);
    return () => window.removeEventListener(event, callback);
  }, [event, callback]);
};

export const useGlobalWindowScroll = (callback: any) => {
  return useWindowEvent('scroll', callback);
};
