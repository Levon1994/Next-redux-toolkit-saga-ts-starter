import { RootState } from '@/store/root.types';

import { IRequestsPendingBranchState } from './requests-pending.types';

export const getReqPendingState = (state: RootState): IRequestsPendingBranchState => state.requestsPending;
export const getReqPending = (state: RootState, type: string): IRequestsPendingBranchState[string] =>
  state.requestsPending[type] || false;
