import { fork, ForkEffect } from 'redux-saga/effects';

import { watchWebSocketMessages } from './watch-web-socket-messages.saga';

export function* webSocketSaga(): Generator<ForkEffect<Generator<unknown, any, unknown>>, void, unknown> {
  yield fork(watchWebSocketMessages);
}
