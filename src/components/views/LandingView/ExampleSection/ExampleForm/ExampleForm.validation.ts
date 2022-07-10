import * as Yup from 'yup';

export const getExampleFormValidation = (): Yup.ObjectSchema<Record<string, any>> => {
  return Yup.object().shape({
    datePicker: Yup.string().required('Date is required'),

    password: Yup.string().required('Password is required'),

    wysiwyg: Yup.string().required('is required'),

    upload: Yup.string().required('is required'),

    email: Yup.string().email('Email not valid').required('Email is required'),
  });
};
