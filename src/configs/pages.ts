/* eslint-disable sonarjs/no-duplicate-string */
import { RoutePathsEnum } from './routes';

import { IPagesCommonConfig } from '@/types/app';

/**
 * Set common config for application pages
 */
export const pagesCommonConfig: IPagesCommonConfig = {
  // Auth pages
  [RoutePathsEnum.AUTH_RESET_PASSWORD]: {
    bodyBackgroundColor: '--bgPrimary',
  },
  [RoutePathsEnum.AUTH_VERIFY_EMAIL]: {
    bodyBackgroundColor: '--bgPrimary',
  },
  [RoutePathsEnum.AUTH_NEW_PASSWORD]: {
    bodyBackgroundColor: '--bgPrimary',
  },
  [RoutePathsEnum.AUTH_SIGN_UP]: {
    bodyBackgroundColor: '--bgPrimary',
  },
  [RoutePathsEnum.AUTH_SIGN_UP]: {
    bodyBackgroundColor: '--bgPrimary',
  },
  // Main pages
  [RoutePathsEnum.MAIN_DASHBOARD]: {
    bodyBackgroundColor: '--bgPrimary',
  },
  // Root page
  [RoutePathsEnum.HOME]: {
    bodyBackgroundColor: '--bgPrimary',
  },
  // Other pages
  default: {
    bodyBackgroundColor: '--bgSecondary',
  },
};

/**
 * Set titles config for application pages
 */
export enum PagesTitlesEnum {
  // Auth pages
  AUTH_RESET_PASSWORD = 'Reset password',
  AUTH_VERIFY_EMAIL = 'Verify email',
  AUTH_NEW_PASSWORD = 'New password',
  AUTH_SIGN_UP = 'Sign up',
  AUTH_SIGN_IN = 'Sign in',
  // Main pages
  MAIN_DASHBOARD = 'Dashboard',
  // Root page
  HOME = 'Home',
}

/**
 * Pages type enum for render specific view in AuthLayout component
 */
export enum AuthPagesTypesEnum {
  RESET_PASSWORD = 'RESET_PASSWORD',
  VERIFY_EMAIL = 'VERIFY_EMAIL',
  NEW_PASSWORD = 'NEW_PASSWORD',
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
}
