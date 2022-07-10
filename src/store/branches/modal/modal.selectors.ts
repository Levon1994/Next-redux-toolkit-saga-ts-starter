import { RootState } from '@/store/root.types';

import { IModalBranchState, IModalFlowData, ISimpleModalState } from './modal.types';

export const getModalState = (state: RootState): IModalBranchState => state.modal;
export const getSimpleModalState = (state: RootState): ISimpleModalState => state.modal.simpleModalState;
export const getModalFlowState = (state: RootState, id: string): IModalFlowData =>
  state.modal.modalFlowsState[id] || null;
