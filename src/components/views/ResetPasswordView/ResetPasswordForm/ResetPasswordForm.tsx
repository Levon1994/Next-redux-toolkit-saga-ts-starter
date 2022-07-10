import { FormikErrors, useFormik } from 'formik';
import { FC } from 'react';

import { RoutePathsEnum } from '@/configs/routes';
import { UiILocatorsEnum } from '@/configs/ui-locators';

import { Button } from '@/components/general/Button';
import { Form } from '@/components/general/Form';
import { FormBlock } from '@/components/general/FormBlock';
import { FormText } from '@/components/general/FormText';
import { Input } from '@/components/general/Input';
import { Link } from '@/components/general/Link';
import { FormFieldLayout } from '@/components/layouts/FormFieldLayout';

import { getResetPasswordFormValidation } from './ResetPasswordForm.validation';

type Props = {
  submitFetching: boolean;
  onSubmit: (values: IResetPasswordFormValues) => void;
  error?: string;
};

export interface IResetPasswordFormValues {
  email: string;
}

export const ResetPasswordForm: FC<Props> = ({ submitFetching, onSubmit, error }) => {
  const formik = useFormik<IResetPasswordFormValues>({
    validationSchema: getResetPasswordFormValidation(),
    validateOnChange: false,
    validateOnBlur: true,
    initialValues: {
      email: 'test@s-pro.io',
    },
    validate: () => {
      const errors: FormikErrors<IResetPasswordFormValues> = {};

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
        <FormText text="Reset password" type="title" />
      </FormBlock>

      <FormBlock marginBottom="s6">
        <FormText
          // eslint-disable-next-line max-len
          text="Enter the email address associated with your account, and we’ll email you a link to reset your password."
          type="subtitle"
        />
      </FormBlock>

      <FormBlock marginBottom="s2">
        <FormFieldLayout
          blockTitle
          subLabel="Required"
          status={{ error: touched.email && !!errors.email, des: errors.email }}
          label="Email address"
        >
          <Input
            {...getFieldProps('email')}
            placeholder="Enter your email here"
            error={touched.email && !!errors.email}
            id={UiILocatorsEnum.RESET_PASSWORD_FORM_EMAIL}
          />
        </FormFieldLayout>
      </FormBlock>

      {error && (
        <FormBlock marginBottom="s6">
          <FormText type="error" text={error} />
        </FormBlock>
      )}

      <FormBlock marginBottom="s3">
        <Button
          disabled={!isValid}
          loading={submitFetching}
          height="lg"
          type="submit"
          id={UiILocatorsEnum.RESET_PASSWORD_FORM_SUBMIT}
        >
          Send reset link
        </Button>
      </FormBlock>

      <FormBlock alignH="center">
        <Link id={UiILocatorsEnum.RESET_PASSWORD_FORM_BACK_LINK} to={RoutePathsEnum.AUTH_SIGN_IN}>
          Back to sign in
        </Link>
      </FormBlock>
    </Form>
  );
};
