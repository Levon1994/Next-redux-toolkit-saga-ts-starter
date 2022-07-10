import { useRouter } from 'next/router';

import { AuthPagesTypesEnum } from '@/configs/pages';
import { RoutePathsEnum } from '@/configs/routes';

/**
 * Get a hook-function to use Auth Page type
 * Set current page type related to current auth route
 */
export const useAuthPageType = (): AuthPagesTypesEnum | null => {
  const { route } = useRouter();

  let pageType: AuthPagesTypesEnum | null = null;

  switch (route) {
    case RoutePathsEnum.AUTH_SIGN_IN:
      pageType = AuthPagesTypesEnum.SIGN_IN;
      break;

    case RoutePathsEnum.AUTH_SIGN_UP:
      pageType = AuthPagesTypesEnum.SIGN_UP;
      break;

    default:
      break;
  }

  return pageType;
};
