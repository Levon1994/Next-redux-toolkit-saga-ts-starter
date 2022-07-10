import { AnyAction, combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { accountReducer } from './branches/account';
import { authReducer } from './branches/auth';
import { exampleReducer } from './branches/example/example.slice';
import { modalReducer } from './branches/modal';
import { requestsErrorsReducer } from './branches/requests-errors';
import { requestsPendingReducer } from './branches/requests-pending';
import { systemReducer } from './branches/system';
import { StoreEntitiesEnum } from './root.config';
import { RootState } from './root.types';

export const rootReducer = (state: RootState, action: AnyAction): RootState => {
  if (action.type === HYDRATE) {
    const nextState: RootState = {
      ...state, // Use previous states
      ...action.payload, // Apply delta from hydration
    };

    if (state.system) nextState.system = state.system;

    return nextState;
  } else {
    const combinedReducer = combineReducers({
      // List of custom branch reducers
      [StoreEntitiesEnum.REQUESTS_PENDING]: requestsPendingReducer,
      [StoreEntitiesEnum.REQUESTS_ERRORS]: requestsErrorsReducer,
      [StoreEntitiesEnum.ACCOUNT]: accountReducer,
      [StoreEntitiesEnum.EXAMPLE]: exampleReducer,
      [StoreEntitiesEnum.SYSTEM]: systemReducer,
      [StoreEntitiesEnum.MODAL]: modalReducer,
      [StoreEntitiesEnum.AUTH]: authReducer,
    });

    return combinedReducer(state, action);
  }
};
