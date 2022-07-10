/**
 * Application custom regexps
 */
export const PASSWORD_WITH_NUMBER_REGEXP = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const INPUT_ONLY_NUMBER_REGEXP = /^([0-9]+)\.?[0-9]*$/;
export const PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
export const EMAIL_REGEXP =
  // eslint-disable-next-line max-len
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,5}))$/;
