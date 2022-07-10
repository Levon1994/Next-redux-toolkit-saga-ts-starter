import find from 'lodash/find';
import { useRouter } from 'next/router';

import { pagesCommonConfig } from '@/configs/pages';

import { IPageConfig } from '@/types/app';

/**
 * Get page common config by url
 */
export const usePageConfig = (): IPageConfig => {
  const { route } = useRouter();

  return find(pagesCommonConfig, (_, key) => route.includes(key)) || pagesCommonConfig.default;
};
