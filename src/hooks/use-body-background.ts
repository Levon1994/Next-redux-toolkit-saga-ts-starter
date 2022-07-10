import { useEffect } from 'react';

import { usePageConfig } from '@/hooks/use-page-config';

/**
 * Get a hook-function to use Page component
 * Set body background color on each page
 */
export const useBodyBackground = (): void => {
  const { bodyBackgroundColor } = usePageConfig();

  useEffect(() => {
    if (bodyBackgroundColor) document.body.style.backgroundColor = `var(${bodyBackgroundColor})`;
  }, [bodyBackgroundColor]);
};
