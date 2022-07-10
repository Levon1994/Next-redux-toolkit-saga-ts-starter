import * as Yup from 'yup';

import { PASSWORD_REGEXP } from '@/configs/regexps';

export const getSignInFormValidation = (): Yup.ObjectSchema<Record<string, any>> => {
  return Yup.object().shape({
    password: Yup.string().matches(PASSWORD_REGEXP, `Please enter a valid password`).required('Password is required'),

    email: Yup.string().email('Email not valid').required('Email is required'),
  });
};
