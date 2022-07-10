import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { systemActions, systemTypes } from '@/store/branches/system';
import { PROJECT_SHORT_PREFIX } from '@/store/root.config';

import { infiniteListMock } from '@/mocks/infinite-list';

import { IExampleBranchState, IGetForecastReqPayload } from './example.types';

const initialState: IExampleBranchState = {
  forecastState: {
    forecast: null,
  },
  infiniteState: {
    infiniteList: [],
  },
  paginationState: {
    page: 0,
  },
};

const exampleSlice = createSlice({
  name: `${PROJECT_SHORT_PREFIX}/example`,
  initialState,
  reducers: {
    getForecastExampleReq$success: (state, action: PayloadAction<{ data: any }>) => {
      state.forecastState.forecast = action.payload.data;
    },

    changePageExample: (state, action: PayloadAction<{ page: number }>) => {
      state.paginationState.page = action.payload.page;
    },

    // TODO: Split load and load more logic in store
    infiniteScrollExampleReq$success: (state) => {
      state.infiniteState.infiniteList = [...state.infiniteState.infiniteList, ...infiniteListMock];
    },
    // System
    restoreBranch: () => initialState,
  },

  extraReducers: (builder) => {
    builder.addCase(systemActions.restoreInitialAppState, () => initialState);
  },
});

const { actions, reducer } = exampleSlice;

const a = (actionPiece: string): string => `${PROJECT_SHORT_PREFIX}/example/${actionPiece}`;

const simpleActions = {
  getForecastExampleReq$error: createAction<systemTypes.IErrorReq>(a('getForecastExampleReq$error')),

  getForecastExampleReq: createAction<IGetForecastReqPayload>(a('getForecastExampleReq')),

  infiniteScrollExampleReq$error: createAction<systemTypes.IErrorReq>(a('infiniteScrollExampleReq$error')),

  infiniteScrollExampleReq: createAction(a('infiniteScrollExampleReq')),
};

export const exampleInitialState = initialState;
export const exampleReducer = reducer;
export const exampleActions = {
  ...simpleActions,
  ...actions,
};
