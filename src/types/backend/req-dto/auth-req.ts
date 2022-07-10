export interface ISignInReqDto {
  password: string;
  email: string;
}

export interface ISignUpReqDto {
  confirmPassword: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}
