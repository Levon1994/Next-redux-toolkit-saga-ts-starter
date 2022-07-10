import {
  AnyAction,
  configureStore,
  Dispatch,
  EnhancedStore,
  Middleware,
  PreloadedState,
  Reducer,
  Store,
} from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { createLogger } from 'redux-logger';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import createSagaMiddleware, { Task } from 'redux-saga';

import { isServer } from '@/utils/is-server';

import { persistConfig } from '@/store/root.config';
import { rootReducer } from '@/store/root.reducer';
import { rootSaga } from '@/store/root.saga';
import { RootState } from '@/store/root.types';

export interface ISagaStore extends Store {
  sagaTask?: Task;
  runSaga: () => void;
}

type MakeStoreReturned = EnhancedStore<any, AnyAction, Middleware<Record<string, any>, any, Dispatch<AnyAction>>[]>;

const makeStore = (): ISagaStore => {
  const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer as Reducer<RootState, AnyAction>);
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, createLogger({ collapsed: true })];
  const makeConfiguredStore = (
    reducer: Reducer,
    preloadedState: PreloadedState<Record<string, any>> = {}
  ): MakeStoreReturned => {
    return configureStore({
      preloadedState,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            // Ignore these action types (includes actions from redux-persist)
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            // Ignore these field paths in all actions (includes actions with meta object)
            ignoredActionPaths: ['meta.onSuccess', 'meta.onError'],
          },
          immutableCheck: true,
          thunk: false,
        }).concat(middlewares),
      enhancers: [],
      devTools: process.env.NODE_ENV !== 'production',
      reducer,
    });
  };

  const store = makeConfiguredStore(isServer() ? rootReducer : persistedReducer) as ISagaStore;

  if (!isServer()) persistStore(store);

  store.runSaga = () => {
    if (store.sagaTask) return;

    store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  store.runSaga();

  return store;
};

export const wrapper = createWrapper<Store<ISagaStore>>(makeStore);
