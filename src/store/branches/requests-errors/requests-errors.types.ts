import { Error } from '@/store/root.types';

export interface IRequestsErrorsBranchState {
  [key: string]: Error;
}
