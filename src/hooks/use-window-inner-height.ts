import { useEffect } from 'react';

import { isServer } from '@/utils/is-server';

/**
 * Get a hook-function to use window inner height
 * Set window inner height K to html element style
 */
export const useWindowInnerHeight = (): void => {
  const clientSide = !isServer();

  useEffect(() => {
    if (clientSide) {
      const vh = window.innerHeight * 0.01;

      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  }, [clientSide]);
};
