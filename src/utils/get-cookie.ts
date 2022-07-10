import Cookie from 'js-cookie';
import { GetServerSidePropsContext } from 'next';
import getCookies from 'next-cookies';

/**
 * Get cookie on server or client
 */
export const getCookie = (context: GetServerSidePropsContext, cookieName: string): string | null => {
  if (context.req) return getCookies(context)[cookieName] || null;

  return Cookie.get(cookieName) || null;
};
