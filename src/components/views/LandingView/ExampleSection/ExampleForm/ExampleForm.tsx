import { FormikErrors, useFormik } from 'formik';
import { DateTime } from 'luxon';
import dynamic from 'next/dynamic';
import React, { FC } from 'react';

import { acceptedFileFormats, acceptedImageFormats, acceptedVideoFormats } from '@/configs/formats';
import { INPUT_ONLY_NUMBER_REGEXP } from '@/configs/regexps';

import { Attach } from '@/components/general/Attach';
import { Button } from '@/components/general/Button';
import { Checkbox } from '@/components/general/Checkbox';
import { DatePeriod } from '@/components/general/DatePeriod';
import { DatePicker } from '@/components/general/DatePicker';
import { Form } from '@/components/general/Form';
import { FormBlock } from '@/components/general/FormBlock';
import { FormText } from '@/components/general/FormText';
import { Input } from '@/components/general/Input';
import { InputPhone } from '@/components/general/InputPhone';
import { InputSearch } from '@/components/general/InputSearch';
import { Rating } from '@/components/general/Rating';
import { Select } from '@/components/general/Select';
import { Switch } from '@/components/general/Switch';
import { Textarea } from '@/components/general/Textarea';
import { Upload } from '@/components/general/Upload';
import { FormFieldLayout } from '@/components/layouts/FormFieldLayout';
import { AttachRp } from '@/components/render-props/AttachRp';

import { getExampleFormValidation } from './ExampleForm.validation';

const InputCode = dynamic(() => import('@/components/general/InputCode'), { ssr: false });

type Props = {
  submitFetching?: boolean;
  onSubmit(values: IFormValues): void;
};

interface IFormValues {
  lengthTextarea: string;
  simpleTextarea: string;
  simpleSelect: Record<string, any> | null;
  multiSelect: Record<string, any>[] | null;
  inputNumber: string;
  inputSearch: string;
  inputPhone: string;
  datePicker: string;
  inputCode: string;
  checkbox: boolean;
  fromDate: string;
  attach: File[];
  switch: boolean;
  upload: string;
  toDate: string;
  rating: number;
}

export const ExampleForm: FC<Props> = ({ submitFetching, onSubmit }) => {
  const formik = useFormik<IFormValues>({
    validationSchema: getExampleFormValidation(),
    validateOnChange: false,
    validateOnBlur: true,
    initialValues: {
      lengthTextarea: '',
      simpleTextarea: '',
      simpleSelect: null,
      multiSelect: null,
      inputNumber: '',
      inputSearch: '',
      datePicker: '',
      inputPhone: '',
      inputCode: '',
      checkbox: false,
      fromDate: '',
      switch: false,
      upload: '',
      toDate: '',
      attach: [],
      rating: 0,
    },
    validate: () => {
      const errors: FormikErrors<IFormValues> = {};

      return errors;
    },
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const { getFieldProps, setFieldValue, handleSubmit, touched, isValid, values, errors } = formik;

  return (
    <Form onSubmit={handleSubmit}>
      <FormBlock marginBottom="s3">
        <FormText text="Form title example" type="title" />
      </FormBlock>

      <FormBlock marginBottom="s3">
        <FormText text="Form subtitle example" type="subtitle" />
      </FormBlock>

      <FormBlock marginBottom="s3">
        <FormText text="Form simple text example" type="simple" />
      </FormBlock>

      <FormBlock>
        <FormFieldLayout
          blockTitle
          subLabel="Required"
          status={{
            error: touched.inputSearch && !!errors.inputSearch,
            des: errors.inputSearch,
          }}
          label="Input number"
        >
          <Input
            {...getFieldProps('inputNumber')}
            placeholder="Enter your test value"
            onChange={(e) => setFieldValue('inputNumber', e.target.value)}
            pattern={INPUT_ONLY_NUMBER_REGEXP}
            id="form-test-input-type-number"
          />
        </FormFieldLayout>

        <FormFieldLayout
          blockTitle
          subLabel="Required"
          status={{
            error: touched.inputSearch && !!errors.inputSearch,
            des: errors.inputSearch,
          }}
          label="Simple search"
        >
          <InputSearch
            {...getFieldProps('inputSearch')}
            onChange={(value) => setFieldValue('inputSearch', value)}
            onClear={() => setFieldValue('inputSearch', '')}
            id="example-form-search-input-field"
          />
        </FormFieldLayout>

        <FormFieldLayout
          blockTitle
          subLabel="Required"
          status={{
            error: touched.inputPhone && !!errors.inputPhone,
            des: errors.inputPhone,
          }}
          label="Phone"
        >
          <InputPhone {...getFieldProps('inputPhone')} id="example-form-input-phone" />
        </FormFieldLayout>

        <FormFieldLayout
          blockTitle
          subLabel="Required"
          status={{
            error: touched.simpleSelect && !!errors.simpleSelect,
            des: errors.simpleSelect,
          }}
          label="Simple select"
        >
          <Select
            {...getFieldProps('simpleSelect')}
            onChange={(option) => setFieldValue('simpleSelect', option)}
            placeholder="Choose option"
            error={touched.simpleSelect && !!errors.simpleSelect}
            list={[
              { label: 'Test 1', value: 1 },
              { label: 'Test 2', value: 2 },
            ]}
            id="example-form-simple-select-field"
          />
        </FormFieldLayout>

        <FormFieldLayout
          blockTitle
          subLabel="Optional"
          status={{
            error: touched.multiSelect && !!errors.multiSelect,
            des: errors.multiSelect,
          }}
          label="Multi select"
        >
          <Select
            {...getFieldProps('multiSelect')}
            placeholder="Choose options"
            onChange={(option) => setFieldValue('multiSelect', option)}
            isMulti
            error={touched.multiSelect && !!errors.multiSelect}
            list={[
              { label: 'Test 1', value: 1 },
              { label: 'Test 2', value: 2 },
              { label: 'Test 3', value: 3 },
              { label: 'Test 4', value: 4 },
            ]}
            id="example-form-multi-select-field"
          />
        </FormFieldLayout>

        <FormFieldLayout
          blockTitle
          subLabel="Required"
          status={{
            error: touched.simpleTextarea && !!errors.simpleTextarea,
            des: errors.simpleTextarea,
          }}
          label="Simple textarea"
        >
          <Textarea
            {...getFieldProps('simpleTextarea')}
            placeholder="Enter your simple text"
            error={touched.simpleTextarea && !!errors.simpleTextarea}
            id="example-form-simple-textarea-field"
          />
        </FormFieldLayout>

        <FormFieldLayout
          blockTitle
          subLabel="Required"
          status={{
            error: touched.lengthTextarea && !!errors.lengthTextarea,
            des: errors.lengthTextarea,
          }}
          label="Length textarea"
        >
          <Textarea
            {...getFieldProps('lengthTextarea')}
            placeholder="Enter your length text"
            length={20}
            error={touched.lengthTextarea && !!errors.lengthTextarea}
            id="example-form-simple-length-textarea-field"
          />
        </FormFieldLayout>

        <FormFieldLayout
          blockTitle
          subLabel="Required"
          status={{
            error: touched.datePicker && !!errors.datePicker,
            des: errors.datePicker,
          }}
          label="Date picker"
        >
          <DatePicker
            {...getFieldProps('datePicker')}
            getCustomDateFormat={(date) => DateTime.fromJSDate(date).toFormat('dd/MM/yyyy')}
            customConfig={{
              dateFormat: 'dd/MM/yyyy',
            }}
            placeholder="Choose date"
            onChange={(value) => {
              setFieldValue('datePicker', value);
            }}
            error={touched.datePicker && !!errors.datePicker}
            id="example-form-simple-date-picker-field"
          />
        </FormFieldLayout>

        <DatePeriod
          dateFrom={(datePicker) => (
            <FormFieldLayout
              blockTitle
              subLabel="Required"
              status={{
                error: touched.fromDate && !!errors.fromDate,
                des: errors.fromDate,
              }}
              label="From"
            >
              {datePicker({
                ...getFieldProps('fromDate'),
                placeholder: 'Choose from date',
                onChange: (value: string) => {
                  setFieldValue('fromDate', value);
                },
                error: touched.fromDate && !!errors.fromDate,
                id: 'example-simple-date-picker-from-date',
              })}
            </FormFieldLayout>
          )}
          dateTo={(datePicker) => (
            <FormFieldLayout
              blockTitle
              subLabel="Required"
              status={{
                error: touched.toDate && !!errors.toDate,
                des: errors.toDate,
              }}
              label="To"
            >
              {datePicker({
                ...getFieldProps('toDate'),
                placeholder: 'Choose to date',
                onChange: (value: string) => {
                  setFieldValue('toDate', value);
                },
                error: touched.toDate && !!errors.toDate,
                id: 'example-simple-date-picker-to-date',
              })}
            </FormFieldLayout>
          )}
          id="example-form-date-period"
        />

        <FormBlock marginBottom="s3">
          <InputCode {...getFieldProps('inputCode')} id="example-form-input-code" />
        </FormBlock>

        <FormBlock marginBottom="s3">
          <Switch {...getFieldProps('switch')} id="example-form-switch" />
        </FormBlock>

        <FormBlock marginBottom="s3">
          <Checkbox {...getFieldProps('checkbox')} id="example-form-checkbox" />
        </FormBlock>

        <FormBlock marginBottom="s3">
          <Rating
            onChange={(value: number) => {
              setFieldValue('rating', value);
            }}
            value={values.rating}
            id="example-form-rating"
          />
        </FormBlock>

        <FormBlock marginBottom="s3">
          <AttachRp
            onChange={(value) => {
              setFieldValue('attach', value);
            }}
            maxSize={1024 * 1024 * 50}
            accept={[...acceptedImageFormats, ...acceptedVideoFormats, ...acceptedFileFormats]}
            base64
            render={({ files, onOpen, onDelete }) => (
              <Attach onDelete={onDelete} onOpen={onOpen} limit={5} files={files} id="example-form-attach-id" />
            )}
            value={values.attach}
          />
        </FormBlock>

        <FormBlock marginBottom="s3">
          <Upload
            imageOnly
            isCropper
            onChange={(value) => {
              setFieldValue('upload', value);
            }}
            title="Drop an Logo/Image here or select file."
            error={touched.upload && !!errors.upload}
            value={values.upload}
          />
        </FormBlock>
      </FormBlock>

      <FormBlock marginBottom="s3">
        <Button disabled={!isValid} loading={submitFetching} height="lg" type="submit" id="example-form-form-submit">
          Simple
        </Button>
      </FormBlock>
    </Form>
  );
};
