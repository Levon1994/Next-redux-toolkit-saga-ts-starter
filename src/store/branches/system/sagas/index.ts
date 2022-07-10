import { fork, ForkEffect } from 'redux-saga/effects';

import { checkPaletteWatcher } from './watch-check-palette.saga';
import { clearAppPersistStateWatcher } from './watch-clear-app-persist-state.saga';
import { initializeAppWatcher } from './watch-initialize-app.saga';

export function* systemBranchSaga(): Generator<ForkEffect<void>, void, unknown> {
  yield fork(clearAppPersistStateWatcher);
  yield fork(initializeAppWatcher);
  yield fork(checkPaletteWatcher);
}
