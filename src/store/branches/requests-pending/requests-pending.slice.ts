import { createAction, createReducer } from '@reduxjs/toolkit';
import cloneDeep from 'lodash/cloneDeep';
import omit from 'lodash/omit';

import { systemActions } from '@/store/branches/system';
import {
  createActionName,
  getOriginReqActionName,
  isErrorReqAction,
  isPendingReqAction,
  isSuccessReqAction,
} from '@/store/helpers/action';
import { getBranchNamePrefix } from '@/store/helpers/branch';
import { StoreEntitiesEnum } from '@/store/root.config';

import { IRequestsPendingBranchState } from './requests-pending.types';

const branchNamePrefix = getBranchNamePrefix(StoreEntitiesEnum.REQUESTS_PENDING);

export const simpleActions = {
  // System
  restoreBranch: createAction(createActionName(branchNamePrefix, 'restoreBranch')),
};

export const initialState: IRequestsPendingBranchState = {};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(systemActions.restoreInitialAppState, () => initialState)
    .addCase(simpleActions.restoreBranch, () => initialState)
    .addMatcher(isPendingReqAction, (state, action) => {
      state[action.type] = true;
    })
    .addMatcher(isSuccessReqAction, (state, action) => {
      const cloneState = cloneDeep(state);

      return omit(cloneState, [getOriginReqActionName(action.type)]);
    })
    // eslint-disable-next-line sonarjs/no-identical-functions
    .addMatcher(isErrorReqAction, (state, action) => {
      const cloneState = cloneDeep(state);

      return omit(cloneState, [getOriginReqActionName(action.type)]);
    });
});
