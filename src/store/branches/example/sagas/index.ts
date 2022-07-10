import { fork, ForkEffect } from 'redux-saga/effects';

import { getForecastWatcher } from './watch-get-forecast-example.saga';
import { getInfiniteListWatcher } from './watch-get-infinite-scroll.saga';

export function* exampleBranchSaga(): Generator<ForkEffect<void>, void, unknown> {
  yield fork(getInfiniteListWatcher);
  yield fork(getForecastWatcher);
}
