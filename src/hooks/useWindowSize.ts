import { useEffect, useMemo, useState } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const updateWindowDimensions = () => {
      const newWidth = window.innerWidth;
      setWindowSize(newWidth);
    };

    window.addEventListener('resize', updateWindowDimensions);

    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, [window.innerWidth, setWindowSize]);

  const data = useMemo(
    () => ({
      isXs: windowSize <= 480,
      isSm: windowSize <= 640,
      isMd: windowSize <= 768,
      isLg: windowSize >= 868,
      isLt: windowSize >= 1001,
      isXl: windowSize >= 1200,
    }),
    [windowSize]
  );

  return data;
};

export default useWindowSize;
