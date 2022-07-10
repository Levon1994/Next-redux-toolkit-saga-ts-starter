import * as Yup from 'yup';

export const getResetPasswordFormValidation = (): Yup.ObjectSchema<Record<string, any>> => {
  return Yup.object().shape({
    email: Yup.string().email('Email not valid').required('Email is required'),
  });
};
