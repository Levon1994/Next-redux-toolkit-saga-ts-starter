import { IAccount } from '../entities/account';

export interface IAccountWSUpdateDto extends IAccount {
  id?: string;
}
