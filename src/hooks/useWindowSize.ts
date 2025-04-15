import { useEffect, useMemo, useState } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateWindowDimensions = () => {
        setWindowSize(window.innerWidth);
      };

      setWindowSize(window.innerWidth); // Set initial size
      window.addEventListener('resize', updateWindowDimensions);

      return () => window.removeEventListener('resize', updateWindowDimensions);
    }
  }, []);

  const data = useMemo(
    () => ({
      isXs: windowSize !== null && windowSize <= 480,
      isSm: windowSize !== null && windowSize <= 640,
      isMd: windowSize !== null && windowSize <= 768,
      isLg: windowSize !== null && windowSize >= 868,
      isLt: windowSize !== null && windowSize >= 1001,
      isXl: windowSize !== null && windowSize >= 1280,
    }),
    [windowSize]
  );

  return data;
};

export default useWindowSize;
