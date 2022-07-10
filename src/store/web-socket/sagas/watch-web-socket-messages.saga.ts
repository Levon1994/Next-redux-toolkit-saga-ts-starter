import {
  all,
  call,
  CallEffect,
  cps,
  CpsEffect,
  fork,
  put,
  PutEffect,
  select,
  SelectEffect,
  takeEvery,
} from 'redux-saga/effects';
import { Socket } from 'socket.io-client';

import { IWebSocketService, WebSocketService } from '@/services/web-socket';

import { authActions, authSelectors } from '@/store/branches/auth';
import { setupForkEventChannel } from '@/store/helpers/web-socket';

import { sourceChannelsWatchers } from './source-channels';
import { WebSocketEventNamesEnum } from '../web-socket.types';

let webSocketService: IWebSocketService;

function initSocketListeners(socket: Socket) {
  return function* () {
    try {
      yield all(
        sourceChannelsWatchers.map((watcher) => {
          return fork(setupForkEventChannel(watcher, [socket], WebSocketEventNamesEnum.CLOSE_SOCKET_LISTENERS));
        })
      );
    } catch {
      console.debug('[WS]', 'Init socket listeners ERROR');
    }
  };
}

function* createWebsocketAndInitializeListeners(): Generator<
  SelectEffect | CpsEffect<void> | CallEffect<void>,
  void,
  Socket
> {
  try {
    const token = yield select(authSelectors.authTokenSelector);

    if (token) {
      if (webSocketService) webSocketService.disconnect();

      return;
    }

    webSocketService = WebSocketService();

    const transactionEventSource: Socket = yield cps(webSocketService.connect);

    yield call(initSocketListeners(transactionEventSource));
  } catch {
    console.debug('[WS]', 'Create ws and init listeners ERROR');
  }
}

function* disconnectWebsocket(): Generator<
  PutEffect<{
    type: WebSocketEventNamesEnum;
  }>,
  void,
  unknown
> {
  try {
    yield put({ type: WebSocketEventNamesEnum.CLOSE_SOCKET_LISTENERS });

    if (webSocketService) webSocketService.disconnect();
  } catch {
    console.debug('[WS]', 'Disconnect ws and close socket listeners ERROR');
  }
}

export function* watchWebSocketMessages(): Generator {
  yield takeEvery([authActions.signInReq$success.type], createWebsocketAndInitializeListeners);
  yield takeEvery([authActions.signOut.type], disconnectWebsocket);
}
