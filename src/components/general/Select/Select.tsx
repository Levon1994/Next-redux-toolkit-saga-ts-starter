import cn from 'classnames';
import { FC } from 'react';
import ReactSelect, { MultiValue, Options, SingleValue } from 'react-select';

import { UiSizeLayout } from '@/components/layouts/UiSizeLayout';

import styles from './Select.module.scss';

import { UiElementHeightType, UiElementWidthType } from '@/types/ui';

export type SelectOptionType = {
  label: string;
  value: number;
};

type Props = {
  getOptionValue?: (option: SelectOptionType) => string;
  getOptionLabel?: (option: SelectOptionType) => string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  onChange: (option: SingleValue<SelectOptionType> | MultiValue<SelectOptionType>) => void;
  isMulti?: boolean;
  height?: UiElementHeightType;
  width?: UiElementWidthType;
  error?: boolean;
  value: SingleValue<SelectOptionType> | MultiValue<SelectOptionType>;
  list: Options<SelectOptionType>;
  id: string;
};

export const Select: FC<Props> = ({
  getOptionValue,
  getOptionLabel,
  placeholder,
  className,
  disabled,
  onChange,
  isMulti = false,
  height = 'md',
  error,
  value,
  width,
  list,
  id,
}) => {
  return (
    <UiSizeLayout width={width} height={height}>
      <ReactSelect
        classNamePrefix="select"
        getOptionValue={getOptionValue}
        getOptionLabel={getOptionLabel}
        isSearchable={!disabled}
        placeholder={placeholder}
        instanceId={id}
        className={cn(
          styles.selectWrapper,
          {
            [styles[`selectWrapper__rightBlock_${height}`]]: height,
            [styles.selectWrapper_disabled]: disabled,
            [styles.selectWrapper_error]: error,
          },
          className
        )}
        onChange={onChange}
        isMulti={isMulti}
        options={list}
        value={value}
        id={id}
      />
    </UiSizeLayout>
  );
};
