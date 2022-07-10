import { INewPasswordFormValues } from '@/components/views/NewPasswordView/NewPasswordForm';
import { IResetPasswordFormValues } from '@/components/views/ResetPasswordView/ResetPasswordForm';
import { ISignInFormValues } from '@/components/views/SignInView/SignInForm';
import { ISignUpFormValues } from '@/components/views/SignUpView/SignUpForm';

export interface IAuthBranchState {
  token: string | null | undefined;
}

export interface ISignInReqAData {
  values: ISignInFormValues;
}

export interface ISignUpReqAData {
  values: ISignUpFormValues;
}

export interface IVerifyEmailReqAData {
  token: string;
}

export interface IResetPasswordReqAData {
  values: IResetPasswordFormValues;
}

export interface INewPasswordReqAData {
  values: INewPasswordFormValues;
  token: string;
}
