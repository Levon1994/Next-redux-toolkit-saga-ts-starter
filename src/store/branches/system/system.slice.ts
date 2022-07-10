import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { createActionName } from '@/store/helpers/action';
import { getBranchNamePrefix } from '@/store/helpers/branch';
import { StoreEntitiesEnum } from '@/store/root.config';

import { ISystemBranchState, Palette, PaletteTypesEnum } from './system.types';

const branchNamePrefix = getBranchNamePrefix(StoreEntitiesEnum.SYSTEM);

export const initialState: ISystemBranchState = {
  palette: PaletteTypesEnum.LIGHT,
};

export const simpleActions = {
  restoreInitialAppState: createAction(createActionName(branchNamePrefix, 'restoreInitialAppState')),
  clearAppPersistState: createAction(createActionName(branchNamePrefix, 'clearAppPersistState')),
  initializeApp: createAction(createActionName(branchNamePrefix, 'initializeApp')),
};

const systemSlice = createSlice({
  name: branchNamePrefix,
  initialState,
  reducers: {
    setPalette: (state, action: PayloadAction<{ palette: Palette }>) => {
      state.palette = action.payload.palette;
    },
    // System
    restoreBranch: () => initialState,
    restoreInitialAppState: () => initialState,
  },
});

export const { actions, reducer } = systemSlice;
