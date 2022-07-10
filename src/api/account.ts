import { AxiosResponse } from 'axios';

import { apiCaller } from '@/utils/api-caller';

import { IAccount } from '@/types/backend/entities/account';

export const getAccountReq = async (token: string): Promise<AxiosResponse<IAccount>> =>
  apiCaller({
    method: 'GET',
    token,
    url: '/account',
  });
