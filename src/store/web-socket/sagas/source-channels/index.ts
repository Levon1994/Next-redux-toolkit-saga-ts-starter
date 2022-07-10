import { EventChannel } from 'redux-saga';
import { Socket } from 'socket.io-client';

import { handleExampleChange } from './example.source-channel.saga';

export const sourceChannelsWatchers: Array<
  (socket: Socket) => EventChannel<[(...params: any[]) => Generator, ...any[]]>
> = [
  handleExampleChange, // example change handling
  // Other source channels (web socket events) put below
];
