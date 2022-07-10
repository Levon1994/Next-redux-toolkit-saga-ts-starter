import * as Yup from 'yup';

import { PASSWORD_REGEXP } from '@/configs/regexps';

import { nameOf } from '@/utils/name-of';

import { INewPasswordFormValues } from './NewPasswordForm';

export const getNewPasswordFormValidation = (): Yup.ObjectSchema<Record<string, any>> => {
  return Yup.object().shape({
    confirmPassword: Yup.string()
      .oneOf([Yup.ref(nameOf<INewPasswordFormValues>('newPassword'))], 'Passwords must match')
      .required('Password is required'),

    newPassword: Yup.string()
      .matches(PASSWORD_REGEXP, `Please enter a valid password`)
      .required('Password is required'),
  });
};
