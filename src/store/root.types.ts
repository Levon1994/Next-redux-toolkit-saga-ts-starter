import { IAccountBranchState } from './branches/account/account.types';
import { IAuthBranchState } from './branches/auth/auth.types';
import { IExampleBranchState } from './branches/example/example.types';
import { IModalBranchState } from './branches/modal/modal.types';
import { IRequestsErrorsBranchState } from './branches/requests-errors/requests-errors.types';
import { IRequestsPendingBranchState } from './branches/requests-pending/requests-pending.types';
import { ISystemBranchState } from './branches/system/system.types';
import { StoreEntitiesEnum } from './root.config';

export type RootState = {
  [StoreEntitiesEnum.REQUESTS_PENDING]: IRequestsPendingBranchState;
  [StoreEntitiesEnum.REQUESTS_ERRORS]: IRequestsErrorsBranchState;
  [StoreEntitiesEnum.ACCOUNT]: IAccountBranchState;
  [StoreEntitiesEnum.EXAMPLE]: IExampleBranchState;
  [StoreEntitiesEnum.SYSTEM]: ISystemBranchState;
  [StoreEntitiesEnum.MODAL]: IModalBranchState;
  [StoreEntitiesEnum.AUTH]: IAuthBranchState;
};

export type Error = string | null;

export interface IActionMeta {
  successMsg?: string;
  onSuccess?: (data?: Record<string, any>) => void;
  errorMsg?: string;
  onError?: (data?: Record<string, any>) => void;
}
