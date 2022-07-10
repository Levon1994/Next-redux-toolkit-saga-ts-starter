import { EventChannel } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { Socket } from 'socket.io-client';

import { logger } from '@/utils/logger';

import { accountActions } from '@/store/branches/account';
import { setEventChannel } from '@/store/helpers/web-socket';
import { WebSocketEventNamesEnum } from '@/store/web-socket/web-socket.types';

import { IAccountWSUpdateDto } from '@/types/backend/ws-dto/account-ws';

function* onExampleChange(data: IAccountWSUpdateDto) {
  try {
    // @TODO: Put action with data via ws update
    yield put(accountActions.getAccountWS$update({ data }));
  } catch {
    yield logger("Couldn't update account by ws.");
  }
}

export const handleExampleChange = (eventSource: Socket): EventChannel<[(...params: any[]) => Generator, ...any[]]> => {
  return setEventChannel<IAccountWSUpdateDto>(eventSource, WebSocketEventNamesEnum.EXAMPLE_EVENT_NAME, [
    onExampleChange,
  ]);
};
