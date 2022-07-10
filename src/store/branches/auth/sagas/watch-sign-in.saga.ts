import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { AUTH_REDIRECT } from '@/configs/routes';

import { setAccessToken } from '@/services/auth';

import { redirect } from '@/utils/redirect';

import { authActions } from '@/store/branches/auth';

import { signInReq } from '@/api/auth';

import { ISignInResDto } from '@/types/backend/res-dto/auth-res';

export const errorMessage = 'Could not log in. Please, try again.';

export function* signInWorker(action: ReturnType<typeof authActions.signInReq>) {
  const { values } = action.payload;
  const { onError } = action.meta;

  try {
    const response: AxiosResponse<ISignInResDto> = yield call(signInReq, values);

    yield call(setAccessToken, response.data.token);
    yield put(authActions.signInReq$success({ token: response.data.token }));
    yield redirect(AUTH_REDIRECT);
  } catch {
    if (onError) {
      yield call(onError, {
        message: errorMessage,
      });
    }

    yield put(authActions.signInReq$error({ error: errorMessage }));
  }
}

export function* signInWatcher() {
  yield takeEvery(authActions.signInReq.type, signInWorker);
}
