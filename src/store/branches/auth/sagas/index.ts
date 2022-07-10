import { fork, ForkEffect } from 'redux-saga/effects';

import { signInWatcher } from './watch-sign-in.saga';
import { signOutWatcher } from './watch-sign-out.saga';
import { signUpWatcher } from './watch-sign-up.saga';

export function* authBranchSaga(): Generator<ForkEffect<void>, void, unknown> {
  yield fork(signOutWatcher);
  yield fork(signUpWatcher);
  yield fork(signInWatcher);
}
