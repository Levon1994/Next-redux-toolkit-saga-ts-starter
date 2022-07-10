import { call, delay, put, takeEvery } from 'redux-saga/effects';

import { logger } from '@/utils/logger';

import { authActions } from '@/store/branches/auth';

export const errorMessage = 'Could not register. Please, try again.';

export function* signUpWorker(action: ReturnType<typeof authActions.signUpReq>) {
  const { values } = action.payload;
  const { onSuccess, onError } = action.meta;

  yield logger('[Registration payload]', values);

  try {
    const response = Math.floor(Math.random() * 2) ? true : false;

    yield delay(3000);

    if (!response) {
      throw new Error();
    }

    if (onSuccess) {
      yield call(onSuccess);
    }
  } catch {
    if (onError) {
      yield call(onError, {
        message: errorMessage,
      });
    }

    yield put(authActions.signUpReq$error({ error: errorMessage }));
  }
}

export function* signUpWatcher() {
  yield takeEvery(authActions.signUpReq.type, signUpWorker);
}
