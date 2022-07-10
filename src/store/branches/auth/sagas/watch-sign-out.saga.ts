import Router from 'next/router';
import { call, put, takeEvery } from 'redux-saga/effects';

import { NOT_AUTH_REDIRECT } from '@/configs/routes';

import { unsetAccessToken } from '@/services/auth';

import { logger } from '@/utils/logger';

import { authActions } from '@/store/branches/auth';
import { systemActions } from '@/store/branches/system';

export function* signOutWorker() {
  try {
    yield call(unsetAccessToken);
    yield call(Router.replace, NOT_AUTH_REDIRECT);
    yield put(systemActions.restoreInitialAppState());
  } catch {
    yield call(logger, 'Sign out failed.');
  }
}

export function* signOutWatcher() {
  yield takeEvery(authActions.signOut.type, signOutWorker);
}
