import { NextPageContext } from 'next';
import Router from 'next/router';

import { AUTH_REDIRECT, NOT_AUTH_REDIRECT, RoutePathsEnum } from '@/configs/routes';
import { TOKEN_NAME } from '@/configs/system';

import { isServer } from '@/utils/is-server';

export type NotAuthRedirect = typeof NOT_AUTH_REDIRECT;
export type AuthRedirect = typeof AUTH_REDIRECT;

export type SspRedirect = {
  redirect: {
    destination: RoutePathsEnum;
    permanent: boolean;
  };
};

/**
 * Route common redirect based on next context
 */
export const redirect = (
  path: NotAuthRedirect | AuthRedirect | RoutePathsEnum,
  context?: NextPageContext,
  deleteToken?: boolean
): void => {
  if (isServer() && context && context.res) {
    context.res.writeHead(302, {
      Location: path,
      ...(deleteToken
        ? {
            'Set-Cookie': `${TOKEN_NAME}=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
          }
        : {}),
    });
    context.res.end();
  } else {
    Router.replace(path as string);
  }
};

/**
 * Server side props redirect object
 */
export const sspRedirect = (to: RoutePathsEnum = NOT_AUTH_REDIRECT, permanent = false): SspRedirect => {
  return {
    redirect: {
      destination: to,
      permanent: permanent,
    },
  };
};
