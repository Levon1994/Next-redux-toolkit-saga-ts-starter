import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

/**
 * Get hook-function to use for persist application locale to cookie
 */
export const usePersistLocaleCookie = (): void => {
  const { locale, defaultLocale } = useRouter();

  useEffect(() => {
    if (locale) {
      const date = new Date();
      const expireMs = 100 * 365 * 24 * 60 * 60 * 1000; // 100 days

      date.setTime(date.getTime() + expireMs);

      Cookie.set('NEXT_LOCALE', locale);
      Cookie.set('expires', date.toUTCString());
    }
  }, [locale, defaultLocale]);
};
