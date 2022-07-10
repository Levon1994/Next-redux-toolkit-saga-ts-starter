import { takeEvery } from 'redux-saga/effects';

import { logger } from '@/utils/logger';

import { systemActions } from '@/store/branches/system';

export function* initializeAppWorker() {
  yield logger('[Initialize application]');
}

export function* initializeAppWatcher() {
  yield takeEvery(systemActions.initializeApp.type, initializeAppWorker);
}
