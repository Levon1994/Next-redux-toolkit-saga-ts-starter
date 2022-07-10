import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { accountActions } from '@/store/branches/account';

import { getAccountReq } from '@/api/account';

import { IAccount } from '@/types/backend/entities/account';

export const errorMessage = 'Could not get account info. Please, try again.';

export function* getAccountWorker(action: ReturnType<typeof accountActions.getAccountReq>) {
  try {
    const { token } = action.payload;

    const response: AxiosResponse<IAccount> = yield call(getAccountReq, token);

    yield put(accountActions.getAccountReq$success({ data: response.data }));
  } catch {
    yield put(accountActions.getAccountReq$error({ error: errorMessage }));
  }
}

export function* getAccountWatcher() {
  yield takeEvery(accountActions.getAccountReq.type, getAccountWorker);
}
