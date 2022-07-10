import * as Yup from 'yup';

import { PASSWORD_REGEXP } from '@/configs/regexps';

import { nameOf } from '@/utils/name-of';

import { ISignUpFormValues } from './SignUpForm';

export const getSignUpFormValidation = (): Yup.ObjectSchema<Record<string, any>> => {
  return Yup.object().shape({
    confirmPassword: Yup.string()
      .oneOf([Yup.ref(nameOf<ISignUpFormValues>('password'))], 'Passwords must match')
      .required('Password is required'),

    firstName: Yup.string().required('First name is required'),

    password: Yup.string().matches(PASSWORD_REGEXP, `Please enter a valid password`).required('Password is required'),

    lastName: Yup.string().required('Last name is required'),

    email: Yup.string().email('Email not valid').required('Email is required'),
  });
};
