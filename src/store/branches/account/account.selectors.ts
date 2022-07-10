import { RootState } from '@/store/root.types';

import { IAccountBranchState } from './account.types';

export const getAccountState = (state: RootState): IAccountBranchState => state.account;
export const getAccount = (state: RootState): IAccountBranchState['account'] => state.account.account;
