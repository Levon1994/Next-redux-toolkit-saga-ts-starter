import { actions, simpleActions } from './system.slice';

export * as systemSelectors from './system.selectors';
export { initialState as systemInitialState, reducer as systemReducer } from './system.slice';
export * as systemTypes from './system.types';

export const systemActions = {
  ...simpleActions,
  ...actions,
};
