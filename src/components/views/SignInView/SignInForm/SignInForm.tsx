import { FormikErrors, useFormik } from 'formik';
import { FC } from 'react';

import { icons } from '@/configs/icons';
import { UiILocatorsEnum } from '@/configs/ui-locators';

import { Button } from '@/components/general/Button';
import { Form } from '@/components/general/Form';
import { FormBlock } from '@/components/general/FormBlock';
import { FormText } from '@/components/general/FormText';
import { Input } from '@/components/general/Input';
import { SvgIcon } from '@/components/general/SvgIcon';
import { FormFieldLayout } from '@/components/layouts/FormFieldLayout';
import { BoolRp } from '@/components/render-props/BoolRp';

import { getSignInFormValidation } from './SignInForm.validation';

type Props = {
  submitFetching: boolean;
  onSubmit: (values: ISignInFormValues) => void;
};

export interface ISignInFormValues {
  password: string;
  email: string;
}

export const SignInForm: FC<Props> = ({ submitFetching, onSubmit }) => {
  const formik = useFormik<ISignInFormValues>({
    validationSchema: getSignInFormValidation(),
    validateOnChange: false,
    validateOnBlur: true,
    initialValues: {
      password: 'Qwerty123!',
      email: 'test@s-pro.io',
    },
    validate: () => {
      const errors: FormikErrors<ISignInFormValues> = {};

      return errors;
    },
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const { getFieldProps, handleSubmit, touched, isValid, errors } = formik;

  return (
    <Form onSubmit={handleSubmit}>
      <FormBlock marginBottom="s6">
        <FormText text="Log in" type="title" />
      </FormBlock>

      <FormBlock marginBottom="s2">
        <FormFieldLayout
          blockTitle
          subLabel="Required"
          status={{
            error: touched.email && !!errors.email,
            des: errors.email,
          }}
          label="Email"
        >
          <Input
            {...getFieldProps('email')}
            placeholder="Enter your email here"
            error={touched.email && !!errors.email}
            id={UiILocatorsEnum.SIGN_IN_FORM_EMAIL}
          />
        </FormFieldLayout>

        <FormFieldLayout
          blockTitle
          subLabel="Required"
          status={{
            error: touched.password && !!errors.password,
            des: errors.password,
          }}
          label="Password"
        >
          <BoolRp
            render={({ boolValue, toggleBool }) => (
              <Input
                {...getFieldProps('password')}
                placeholder="Enter your password here"
                rightBlock={
                  <SvgIcon
                    onClick={toggleBool}
                    pointer
                    size="lg"
                    src={boolValue ? icons.eyeCrossedIcon : icons.eyeIcon}
                    id={UiILocatorsEnum.SIGN_IN_FORM_PASSWORD_ICON}
                  />
                }
                error={touched.password && !!errors.password}
                type={boolValue ? 'text' : 'password'}
                id={UiILocatorsEnum.SIGN_IN_FORM_PASSWORD}
              />
            )}
          />
        </FormFieldLayout>
      </FormBlock>

      <FormBlock marginBottom="s3">
        <Button
          disabled={!isValid}
          loading={submitFetching}
          height="lg"
          type="submit"
          id={UiILocatorsEnum.SIGN_IN_FORM_SUBMIT}
        >
          Sign in
        </Button>
      </FormBlock>
    </Form>
  );
};
