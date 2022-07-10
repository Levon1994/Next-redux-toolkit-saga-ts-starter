import { RootState } from '@/store/root.types';

import { ISystemBranchState } from './system.types';

export const getSystemState = (state: RootState): ISystemBranchState => state.system;
export const getPalette = (state: RootState): ISystemBranchState['palette'] => state.system.palette;
