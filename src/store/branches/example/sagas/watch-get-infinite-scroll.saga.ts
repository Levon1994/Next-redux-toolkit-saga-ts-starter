import { put, takeEvery } from 'redux-saga/effects';

import { exampleActions } from '@/store/branches/example/example.slice';

export function* getInfiniteListWorker() {
  try {
    yield put(exampleActions.infiniteScrollExampleReq$success());
  } catch {
    yield put(exampleActions.infiniteScrollExampleReq$error({ error: 'Could not load data.' }));
  }
}

export function* getInfiniteListWatcher() {
  yield takeEvery(exampleActions.infiniteScrollExampleReq.type, getInfiniteListWorker);
}
