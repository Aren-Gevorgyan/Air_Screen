import { useEffect, useState } from 'react';

const IOS_IN_APP_BROWSER_REGEX =
  /iPhone|iPad|iPod/i;
const SOCIAL_IN_APP_BROWSER_REGEX =
  /Instagram|FBAN|FBAV|FB_IAB|FB4A/i;

const useIsIosInAppBrowser = () => {
  const [isIosInAppBrowser, setIsIosInAppBrowser] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const userAgent = window.navigator.userAgent || '';
    const isIos = IOS_IN_APP_BROWSER_REGEX.test(userAgent);
    const isSocialInApp = SOCIAL_IN_APP_BROWSER_REGEX.test(userAgent);

    setIsIosInAppBrowser(isIos && isSocialInApp);
  }, []);

  return isIosInAppBrowser;
};

export default useIsIosInAppBrowser;
