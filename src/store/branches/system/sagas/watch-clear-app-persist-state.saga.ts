import { purgeStoredState } from 'redux-persist';
import { call, takeEvery } from 'redux-saga/effects';

import { logger } from '@/utils/logger';

import { systemActions } from '@/store/branches/system';
import { persistConfig } from '@/store/root.config';

export function* clearAppPersistStateWorker() {
  try {
    yield call(purgeStoredState, persistConfig);
  } catch {
    yield logger("Couldn't clear persist store.");
  }
}

export function* clearAppPersistStateWatcher() {
  yield takeEvery(systemActions.clearAppPersistState.type, clearAppPersistStateWorker);
}
