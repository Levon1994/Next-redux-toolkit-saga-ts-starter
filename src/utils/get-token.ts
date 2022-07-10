import Cookie from 'js-cookie';
import { GetServerSidePropsContext } from 'next';

import { TOKEN_NAME } from '@/configs/system';

import { getCookie } from '@/utils/get-cookie';

/**
 * Get token on server or client
 */
export const getToken = (context?: GetServerSidePropsContext): string | null => {
  if (context) return getCookie(context, TOKEN_NAME);

  return Cookie.get(TOKEN_NAME) || null;
};
