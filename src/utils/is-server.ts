/**
 * Check server side process
 */
export const isServer = (): boolean => {
  return typeof window === 'undefined';
};
