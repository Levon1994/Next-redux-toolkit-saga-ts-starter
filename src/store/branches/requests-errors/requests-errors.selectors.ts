import { RootState } from '@/store/root.types';

import { IRequestsErrorsBranchState } from './requests-errors.types';

export const getReqErrorsState = (state: RootState): IRequestsErrorsBranchState => state.requestsErrors;
export const getReqError = (state: RootState, type: string): IRequestsErrorsBranchState[string] =>
  state.requestsErrors[type] || null;
