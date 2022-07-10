/**
 * Routes for all available project pages
 */
export enum RoutePathsEnum {
  // Auth pages
  AUTH_RESET_PASSWORD = '/auth/reset-password',
  AUTH_VERIFY_EMAIL = '/auth/verify-email',
  AUTH_NEW_PASSWORD = '/auth/new-password',
  AUTH_SIGN_UP = '/auth/sign-up',
  AUTH_SIGN_IN = '/auth/sign-in',
  // Main pages
  MAIN_DASHBOARD = '/main/dashboard',
  // Root page
  HOME = '/',
}

/**
 * Routes for auth and not auth redirects
 */
export const NOT_AUTH_REDIRECT = RoutePathsEnum.AUTH_SIGN_IN;
export const AUTH_REDIRECT = RoutePathsEnum.MAIN_DASHBOARD;
