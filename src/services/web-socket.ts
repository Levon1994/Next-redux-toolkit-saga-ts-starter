import io, { Socket } from 'socket.io-client';

import { getAccessToken } from './auth';

export interface IWebSocketService {
  disconnect: () => void;
  connect: (callback: (error: any, result: any) => void) => void;
}

let websocketConnection: Socket | null;

export const WebSocketService = (): IWebSocketService => {
  const connect = (callback: (error: any, result: any) => void): void => {
    if (!getAccessToken()) {
      console.debug('Could not start websocket because client was not authenticated.');

      return;
    }

    if (websocketConnection) disconnect();

    const options = {
      transports: ['websocket'],
      path: process.env.BACKEND_SOCKET_PATH,
    };

    websocketConnection = io(process.env.BACKEND_SOCKET_ENDPOINT as string, options);

    if (websocketConnection) {
      websocketConnection.on('connect', () => {
        console.debug('Websocket is successfully connected.');

        callback(null, websocketConnection);
      });
    }
  };

  const disconnect = (): void => {
    console.debug('Disconnecting websocket...');

    if (!websocketConnection) return;

    websocketConnection.removeAllListeners();
    websocketConnection.disconnect();
    websocketConnection = null;
  };

  return {
    disconnect,
    connect,
  };
};
