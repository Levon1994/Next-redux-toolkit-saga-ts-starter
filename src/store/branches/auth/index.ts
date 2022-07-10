import { actions, simpleActions } from './auth.slice';

export * as authSelectors from './auth.selectors';
export { initialState as authInitialState, reducer as authReducer } from './auth.slice';
export * as authTypes from './auth.types';

export const authActions = {
  ...simpleActions,
  ...actions,
};
