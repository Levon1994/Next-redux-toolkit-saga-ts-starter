import { FormikErrors, useFormik } from 'formik';
import { FC } from 'react';

import { icons } from '@/configs/icons';
import { RoutePathsEnum } from '@/configs/routes';
import { UiILocatorsEnum } from '@/configs/ui-locators';

import { Button } from '@/components/general/Button';
import { Form } from '@/components/general/Form';
import { FormBlock } from '@/components/general/FormBlock';
import { FormText } from '@/components/general/FormText';
import { Input } from '@/components/general/Input';
import { Link } from '@/components/general/Link';
import { SvgIcon } from '@/components/general/SvgIcon';
import { FormFieldLayout } from '@/components/layouts/FormFieldLayout';
import { BoolRp } from '@/components/render-props/BoolRp';

import { getSignUpFormValidation } from './SignUpForm.validation';

type Props = {
  submitFetching: boolean;
  onSubmit: (values: ISignUpFormValues) => void;
  error?: string;
};

export interface ISignUpFormValues {
  confirmPassword: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export const SignUpForm: FC<Props> = ({ submitFetching, onSubmit, error }) => {
  const formik = useFormik<ISignUpFormValues>({
    validationSchema: getSignUpFormValidation(),
    validateOnChange: false,
    validateOnBlur: true,
    initialValues: {
      confirmPassword: 'Qwerty123!',
      firstName: 'TestFirstName',
      lastName: 'TestLastName',
      password: 'Qwerty123!',
      email: 'test@s-pro.io',
    },
    validate: () => {
      const errors: FormikErrors<ISignUpFormValues> = {};

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
        <FormText text="Sign up" type="title" />
      </FormBlock>

      <FormBlock marginBottom="s2">
        <FormFieldLayout
          blockTitle
          subLabel="Required"
          status={{
            error: touched.firstName && !!errors.firstName,
            des: errors.firstName,
          }}
          label="First name"
        >
          <Input
            {...getFieldProps('firstName')}
            placeholder="Enter your first name"
            error={touched.firstName && !!errors.firstName}
            id={UiILocatorsEnum.SIGN_UP_FORM_FIRST_NAME}
          />
        </FormFieldLayout>

        <FormFieldLayout
          blockTitle
          subLabel="Required"
          status={{
            error: touched.lastName && !!errors.lastName,
            des: errors.lastName,
          }}
          label="Last name"
        >
          <Input
            {...getFieldProps('lastName')}
            placeholder="Enter your last name"
            error={touched.lastName && !!errors.lastName}
            id={UiILocatorsEnum.SIGN_UP_FORM_LAST_NAME}
          />
        </FormFieldLayout>

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
            id={UiILocatorsEnum.SIGN_UP_FORM_EMAIL}
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
                    id={UiILocatorsEnum.SIGN_UP_FORM_PASSWORD_ICON}
                  />
                }
                error={touched.password && !!errors.password}
                type={boolValue ? 'text' : 'password'}
                id={UiILocatorsEnum.SIGN_UP_FORM_PASSWORD}
              />
            )}
          />
        </FormFieldLayout>

        <FormFieldLayout
          blockTitle
          subLabel="Required"
          status={{
            error: touched.confirmPassword && !!errors.confirmPassword,
            des: errors.confirmPassword,
          }}
          label="Confirm password"
        >
          <BoolRp
            render={({ boolValue, toggleBool }) => (
              <Input
                {...getFieldProps('confirmPassword')}
                placeholder="Confirm password here"
                rightBlock={
                  <SvgIcon
                    onClick={toggleBool}
                    pointer
                    size="lg"
                    src={boolValue ? icons.eyeCrossedIcon : icons.eyeIcon}
                    id={UiILocatorsEnum.SIGN_UP_FORM_CONFIRM_PASSWORD_ICON}
                  />
                }
                error={touched.confirmPassword && !!errors.confirmPassword}
                type={boolValue ? 'text' : 'password'}
                id={UiILocatorsEnum.SIGN_UP_FORM_CONFIRM_PASSWORD}
              />
            )}
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
          id={UiILocatorsEnum.SIGN_UP_FORM_SUBMIT}
        >
          Sign up
        </Button>
      </FormBlock>

      <FormBlock alignH="center">
        <Link id={UiILocatorsEnum.SIGN_UP_FORM_BACK_LINK} to={RoutePathsEnum.AUTH_SIGN_IN}>
          Back to sign in
        </Link>
      </FormBlock>
    </Form>
  );
};
