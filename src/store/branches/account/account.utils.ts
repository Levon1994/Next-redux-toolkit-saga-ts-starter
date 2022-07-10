import { IAccount } from '@/types/backend/entities/account';

export const isAccountExist = (account: IAccount): boolean => {
  return Object.values(account).every((value) => !!value);
};
