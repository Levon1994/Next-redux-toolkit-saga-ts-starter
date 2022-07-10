import { AxiosResponse } from 'axios';

import { apiCaller } from '@/utils/api-caller';

import { ISignInReqDto, ISignUpReqDto } from '@/types/backend/req-dto/auth-req';
import { ISignInResDto } from '@/types/backend/res-dto/auth-res';

export const signInReq = async (data: ISignInReqDto): Promise<AxiosResponse<ISignInResDto>> =>
  apiCaller({
    method: 'POST',
    data,
    url: '/auth/sign-in',
  });

export const signUpReq = async (data: ISignUpReqDto): Promise<AxiosResponse<void>> =>
  apiCaller({
    method: 'POST',
    data,
    url: '/auth/sign-up',
  });
