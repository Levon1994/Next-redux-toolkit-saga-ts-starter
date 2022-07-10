import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { systemActions, systemTypes } from '@/store/branches/system';
import { createActionName } from '@/store/helpers/action';
import { getBranchNamePrefix } from '@/store/helpers/branch';
import { StoreEntitiesEnum } from '@/store/root.config';
import { IActionMeta } from '@/store/root.types';

import {
  IAuthBranchState,
  INewPasswordReqAData,
  IResetPasswordReqAData,
  ISignInReqAData,
  ISignUpReqAData,
  IVerifyEmailReqAData,
} from './auth.types';

const branchNamePrefix = getBranchNamePrefix(StoreEntitiesEnum.AUTH);

export const initialState: IAuthBranchState = {
  token: null,
};

export const simpleActions = {
  signInReq$error: createAction<systemTypes.IErrorReq>(createActionName(branchNamePrefix, 'signInReq$error')),
  signInReq: createAction(
    createActionName(branchNamePrefix, 'signInReq'),
    (data: ISignInReqAData, meta: IActionMeta) => ({
      payload: data,
      meta,
    })
  ),

  signUpReq$error: createAction<systemTypes.IErrorReq>(createActionName(branchNamePrefix, 'signUpReq$error')),
  signUpReq: createAction(
    createActionName(branchNamePrefix, 'signUpReq'),
    (data: ISignUpReqAData, meta: IActionMeta) => ({
      payload: data,
      meta,
    })
  ),

  resetPasswordReq$error: createAction<systemTypes.IErrorReq>(
    createActionName(branchNamePrefix, 'resetPasswordReq$error')
  ),
  resetPasswordReq: createAction(
    createActionName(branchNamePrefix, 'resetPasswordReq'),
    (data: IResetPasswordReqAData, meta: IActionMeta) => ({
      payload: data,
      meta,
    })
  ),

  newPasswordReq$error: createAction<systemTypes.IErrorReq>(createActionName(branchNamePrefix, 'newPasswordReq$error')),
  newPasswordReq: createAction(
    createActionName(branchNamePrefix, 'newPasswordReq'),
    (data: INewPasswordReqAData, meta: IActionMeta) => ({
      payload: data,
      meta,
    })
  ),

  verifyEmailReq$error: createAction<systemTypes.IErrorReq>(createActionName(branchNamePrefix, 'verifyEmailReq$error')),
  verifyEmailReq: createAction(
    createActionName(branchNamePrefix, 'verifyEmailReq'),
    (data: IVerifyEmailReqAData, meta: IActionMeta) => ({
      payload: data,
      meta,
    })
  ),

  signOut: createAction(createActionName(branchNamePrefix, 'signOut')),
};

const authSlice = createSlice({
  name: branchNamePrefix,
  initialState,
  reducers: {
    signInReq$success: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    // System
    restoreBranch: () => initialState,
  },
  // Extra
  extraReducers: (builder) => {
    builder.addCase(systemActions.restoreInitialAppState, () => initialState);
  },
});

export const { actions, reducer } = authSlice;
