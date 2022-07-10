import Cookie from 'js-cookie';

import { TOKEN_NAME } from '@/configs/system';

type Storage = 'local' | 'cookie';

export const getAccessToken = (storage: Storage = 'cookie'): string | null | undefined => {
  if (storage === 'cookie') {
    return Cookie.get(TOKEN_NAME);
  } else {
    return localStorage.getItem(TOKEN_NAME);
  }
};

export const setAccessToken = (token: string, storage: Storage = 'cookie'): void => {
  if (storage === 'cookie') {
    Cookie.set(TOKEN_NAME, token);
  } else {
    localStorage.setItem(TOKEN_NAME, token);
  }
};

export const unsetAccessToken = (storage: Storage = 'cookie'): void => {
  if (storage === 'cookie') {
    return Cookie.remove(TOKEN_NAME);
  } else {
    return localStorage.removeItem(TOKEN_NAME);
  }
};
