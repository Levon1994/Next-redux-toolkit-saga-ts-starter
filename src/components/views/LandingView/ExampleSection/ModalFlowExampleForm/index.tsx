import { FormikErrors, useFormik } from 'formik';
import { FC } from 'react';
import * as Yup from 'yup';

import { Button } from '@/components/general/Button';
import { Form } from '@/components/general/Form';
import { FormBlock } from '@/components/general/FormBlock';
import { Input } from '@/components/general/Input';
import { ModalActionsTemplate } from '@/components/general/modal/ModalActionsTemplate';
import { FormFieldLayout } from '@/components/layouts/FormFieldLayout';

import { ModalFlowEnum } from '@/store/branches/modal/modal.types';

type Props = {
  onSubmit: (type: ModalFlowEnum, values: IFormValues) => void;
  onClose: () => void;
};

export interface IFormValues {
  lat: string;
  lon: string;
}

export const ModalFlowExampleForm: FC<Props> = ({ onSubmit, onClose }) => {
  const formik = useFormik<IFormValues>({
    validationSchema: exampleModalFlowFormValidation(),
    validateOnChange: false,
    validateOnBlur: true,
    initialValues: {
      lat: '47.8228900',
      lon: '35.1903100',
    },
    validate: () => {
      const errors: FormikErrors<IFormValues> = {};

      return errors;
    },
    onSubmit: (values) => {
      onSubmit(ModalFlowEnum.REVIEW, values);
    },
  });

  const { getFieldProps, handleSubmit, touched, isValid, errors } = formik;

  return (
    <Form onSubmit={handleSubmit} width="full">
      <FormBlock marginBottom="s2">
        <FormFieldLayout
          blockTitle
          subLabel="Required"
          status={{ error: touched.lat && !!errors.lat, des: errors.lat }}
          label="Latitude coordinates"
        >
          <Input
            {...getFieldProps('lat')}
            placeholder="Enter latitude coordinates here"
            error={touched.lat && !!errors.lat}
            id="modal-flow-form-lat"
          />
        </FormFieldLayout>

        <FormFieldLayout
          blockTitle
          subLabel="Required"
          status={{ error: touched.lon && !!errors.lon, des: errors.lon }}
          label="Longitude coordinates"
        >
          <Input
            {...getFieldProps('lon')}
            placeholder="Enter longitude coordinates here"
            error={touched.lon && !!errors.lon}
            id="modal-flow-form-lon"
          />
        </FormFieldLayout>
      </FormBlock>

      <ModalActionsTemplate noPadding>
        <Button variant="outlined" height="lg" onClick={onClose} id="modal-flow-form-cancel-btn">
          Cancel
        </Button>

        <Button disabled={!isValid} height="lg" type="submit" id="modal-flow-form-submit-btn">
          Continue
        </Button>
      </ModalActionsTemplate>
    </Form>
  );
};

const exampleModalFlowFormValidation = (): Yup.ObjectSchema<Record<string, any>> => {
  return Yup.object().shape({
    lat: Yup.string().required('Latitude is required'),
    lon: Yup.string().required('Longitude is required'),
  });
};
