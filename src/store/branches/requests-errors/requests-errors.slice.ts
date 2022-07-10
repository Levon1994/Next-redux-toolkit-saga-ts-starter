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

import { IRequestsErrorsBranchState } from './requests-errors.types';

const branchNamePrefix = getBranchNamePrefix(StoreEntitiesEnum.REQUESTS_ERRORS);

export const simpleActions = {
  deleteError: createAction(createActionName(branchNamePrefix, 'deleteError'), (errorActionName: string) => {
    return {
      payload: {
        errorActionName,
      },
    };
  }),
  // System
  restoreBranch: createAction(createActionName(branchNamePrefix, 'restoreBranch')),
};

export const initialState: IRequestsErrorsBranchState = {};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(simpleActions.deleteError, (state, action) => {
      const cloneState = cloneDeep(state);

      return omit(cloneState, [getOriginReqActionName(action.payload.errorActionName)]);
    })
    .addCase(systemActions.restoreInitialAppState, () => initialState)
    .addCase(simpleActions.restoreBranch, () => initialState)
    .addMatcher(isPendingReqAction, (state, action) => {
      const cloneState = cloneDeep(state);

      return omit(cloneState, [action.type]);
    })
    .addMatcher(isSuccessReqAction, (state, action) => {
      const cloneState = cloneDeep(state);

      return omit(cloneState, [getOriginReqActionName(action.type)]);
    })
    .addMatcher(isErrorReqAction, (state, action) => {
      state[getOriginReqActionName(action.type)] = action.payload.error;
    });
});
