import { fork, ForkEffect } from 'redux-saga/effects';

import { getAccountWatcher } from './watch-get-account.saga';

export function* accountBranchSaga(): Generator<ForkEffect<void>, void, unknown> {
  yield fork(getAccountWatcher);
}
