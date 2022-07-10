import { actions, simpleActions } from './account.slice';

export * as accountSelectors from './account.selectors';
export { initialState as accountInitialState, reducer as accountReducer } from './account.slice';
export * as accountTypes from './account.types';
export * as accountUtils from './account.utils';

export const accountActions = {
  ...simpleActions,
  ...actions,
};
