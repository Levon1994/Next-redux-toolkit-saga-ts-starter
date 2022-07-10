import { RootState } from '@/store/root.types';

import { IExampleBranchState, IInfiniteState, IPaginationState } from './example.types';

export const exampleStateSelector = (state: RootState): IExampleBranchState => state.example;

export const infiniteListSelector = (state: RootState): IInfiniteState['infiniteList'] =>
  state.example.infiniteState.infiniteList;

export const paginationExamplePageSelector = (state: RootState): IPaginationState['page'] =>
  state.example.paginationState.page;
