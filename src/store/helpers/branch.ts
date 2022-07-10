import { PROJECT_SHORT_PREFIX, StoreEntitiesEnum } from '@/store/root.config';

export const getBranchNamePrefix = (branch: StoreEntitiesEnum): string => {
  return `${PROJECT_SHORT_PREFIX}/${branch}`;
};
