import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import omit from 'lodash/omit';

import { systemActions } from '@/store/branches/system';
import { getBranchNamePrefix } from '@/store/helpers/branch';
import { StoreEntitiesEnum } from '@/store/root.config';

import { IModalBranchState, IModalFlowData, ModalFlowEnum, ModalNameType } from './modal.types';

const branchNamePrefix = getBranchNamePrefix(StoreEntitiesEnum.MODAL);

export const initialState: IModalBranchState = {
  simpleModalState: {
    modalName: null,
    modalData: null,
  },
  modalFlowsState: {},
};

const modalSlice = createSlice({
  name: branchNamePrefix,
  initialState,
  reducers: {
    openModalFlow: (
      state,
      action: PayloadAction<{ modalData?: Record<string, any>; modalType: ModalFlowEnum; modalId: string }>
    ) => {
      const { modalData = {}, modalType } = action.payload;
      const data: IModalFlowData = { modalData, modalType };

      state.modalFlowsState = {
        ...state.modalFlowsState,
        [action.payload.modalId]: data,
      };
    },
    changeFlowModalType: (
      state,
      action: PayloadAction<{
        modalData?: Record<string, any>;
        modalType: ModalFlowEnum;
        modalId: string;
      }>
    ) => {
      let modalData;

      if (action.payload.modalData) {
        modalData = { ...state.modalFlowsState[action.payload.modalId].modalData, ...action.payload.modalData };
      } else {
        modalData = state.modalFlowsState[action.payload.modalId].modalData;
      }

      state.modalFlowsState = {
        ...state.modalFlowsState,
        [action.payload.modalId]: {
          ...state.modalFlowsState[action.payload.modalId],
          modalType: action.payload.modalType,
          modalData,
        },
      };
    },
    closeModalFlow: (state, action: PayloadAction<{ modalId: string }>) => {
      if (state.modalFlowsState[action.payload.modalId]) {
        state.modalFlowsState = {
          ...state.modalFlowsState,
          [action.payload.modalId]: {
            ...state.modalFlowsState[action.payload.modalId],
            modalType: ModalFlowEnum.CLOSED,
          },
        };
      }
    },
    clearCloseModalFlow: (state, action: PayloadAction<{ modalId: string }>) => {
      state.modalFlowsState = omit(state.modalFlowsState, action.payload.modalId);
    },
    openSimpleModal: (
      state,
      action: PayloadAction<{
        data?: Record<string, any>;
        name: ModalNameType;
      }>
    ) => {
      state.simpleModalState = {
        modalName: action.payload.name,
        modalData: action.payload.data || state.simpleModalState.modalData,
      };
    },
    closeSimpleModal: (state) => {
      state.simpleModalState = initialState.simpleModalState;
    },
    // System
    restoreBranch: () => initialState,
  },
  // Extra
  extraReducers: (builder) => {
    builder.addCase(systemActions.restoreInitialAppState, () => initialState);
  },
});

export const { actions, reducer } = modalSlice;
