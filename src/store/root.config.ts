import { storage } from '@/store/helpers/create-persist-storage';

/**
 * Redux actions short prefix
 */
export const PROJECT_SHORT_PREFIX = '@@starter';

/**
 * Enum for typing store state branches
 */
export enum StoreEntitiesEnum {
  REQUESTS_PENDING = 'requestsPending',
  REQUESTS_ERRORS = 'requestsErrors',
  ACCOUNT = 'account',
  EXAMPLE = 'example',
  SYSTEM = 'system',
  MODAL = 'modal',
  AUTH = 'auth',
}

/**
 * Put store branches to set into persist
 */
export const persistWhitelistStores = [StoreEntitiesEnum.MODAL];

/**
 * Persist config for store
 */
export const persistConfig = {
  whitelist: persistWhitelistStores || [], // Make sure it does not clash with server keys
  storage,
  debug: true,
  key: 'nextjs',
};
