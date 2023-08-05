import { useState, useEffect } from 'react';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

export const useIsMobileOrTablet = () => {
  const isMobileOrTablet = useMediaQuery('(max-width: 1224px)');
  return isMobileOrTablet;
};

export const useIsMobile = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return isMobile;
};

export default useMediaQuery;
