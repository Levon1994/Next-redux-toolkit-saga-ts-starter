import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { systemActions, systemTypes } from '@/store/branches/system';
import { createActionName } from '@/store/helpers/action';
import { getBranchNamePrefix } from '@/store/helpers/branch';
import { StoreEntitiesEnum } from '@/store/root.config';

import { IAccountBranchState } from './account.types';

import { IAccount } from '@/types/backend/entities/account';
import { IGetAccountReqDto } from '@/types/backend/req-dto/account-req';

const branchNamePrefix = getBranchNamePrefix(StoreEntitiesEnum.ACCOUNT);

export const initialState: IAccountBranchState = {
  account: {
    firstName: '',
    lastName: '',
    email: '',
  },
};

export const simpleActions = {
  getAccountReq$error: createAction<systemTypes.IErrorReq>(createActionName(branchNamePrefix, 'getAccountReq$error')),
  getAccountReq: createAction<IGetAccountReqDto>(createActionName(branchNamePrefix, 'getAccountReq')),
};

const accountSlice = createSlice({
  name: branchNamePrefix,
  initialState,
  reducers: {
    getAccountReq$success: (state, action: PayloadAction<{ data: IAccount }>) => {
      state.account = action.payload.data;
    },
    getAccountWS$update: (state, action: PayloadAction<{ data: IAccount }>) => {
      state.account = action.payload.data;
    },
    // System
    restoreBranch: () => initialState,
  },
  // Extra
  extraReducers: (builder) => {
    builder.addCase(systemActions.restoreInitialAppState, () => initialState);
  },
});

export const { actions, reducer } = accountSlice;
