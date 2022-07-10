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

import { getNewPasswordFormValidation } from './NewPasswordForm.validation';

type Props = {
  submitFetching: boolean;
  onSubmit: (values: INewPasswordFormValues) => void;
  error?: string;
};

export interface INewPasswordFormValues {
  confirmPassword: string;
  newPassword: string;
}

export const NewPasswordForm: FC<Props> = ({ submitFetching, onSubmit, error }) => {
  const formik = useFormik<INewPasswordFormValues>({
    validationSchema: getNewPasswordFormValidation(),
    validateOnChange: false,
    validateOnBlur: true,
    initialValues: {
      confirmPassword: 'Qwerty123!',
      newPassword: 'Qwerty123!',
    },
    validate: () => {
      const errors: FormikErrors<INewPasswordFormValues> = {};

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
        <FormText text="New password" type="title" />
      </FormBlock>

      <FormBlock marginBottom="s2">
        <FormFieldLayout
          blockTitle
          subLabel="Required"
          status={{
            error: touched.newPassword && !!errors.newPassword,
            des: errors.newPassword,
          }}
          label="New password"
        >
          <BoolRp
            render={({ boolValue, toggleBool }) => (
              <Input
                {...getFieldProps('newPassword')}
                placeholder="Enter new password here"
                rightBlock={
                  <SvgIcon
                    onClick={toggleBool}
                    pointer
                    size="lg"
                    src={boolValue ? icons.eyeCrossedIcon : icons.eyeIcon}
                    id={UiILocatorsEnum.NEW_PASSWORD_FORM_NEW_PASSWORD_ICON}
                  />
                }
                error={touched.newPassword && !!errors.newPassword}
                type={boolValue ? 'text' : 'password'}
                id={UiILocatorsEnum.NEW_PASSWORD_FORM_NEW_PASSWORD}
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
                    id={UiILocatorsEnum.NEW_PASSWORD_FORM_CONFIRM_PASSWORD_ICON}
                  />
                }
                error={touched.confirmPassword && !!errors.confirmPassword}
                type={boolValue ? 'text' : 'password'}
                id={UiILocatorsEnum.NEW_PASSWORD_FORM_CONFIRM_PASSWORD}
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
          id={UiILocatorsEnum.NEW_PASSWORD_FORM_SUBMIT}
        >
          Set new password
        </Button>
      </FormBlock>

      <FormBlock alignH="center">
        <Link id={UiILocatorsEnum.NEW_PASSWORD_FORM_BACK_LINK} to={RoutePathsEnum.AUTH_SIGN_IN}>
          Back to sign in
        </Link>
      </FormBlock>
    </Form>
  );
};
