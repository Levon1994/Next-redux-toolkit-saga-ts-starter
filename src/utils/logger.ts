/* eslint-disable no-console */

/**
 * Custom function to create comfortable and readable log in console only for development env
 */
export const logger = (label: string, data?: unknown): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`%c Logger: ----- ${label} ----- `, 'background: #ff8a00; color: #000000; font-weight: bold;');

    if (data) {
      console.log(data);
      console.log('--------------------');
    }
  }
};
