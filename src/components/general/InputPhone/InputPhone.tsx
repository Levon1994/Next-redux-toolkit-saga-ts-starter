import cn from 'classnames';
import { FC } from 'react';
import ReactPhoneInput from 'react-phone-input-2';

import { UiSizeLayout } from '@/components/layouts/UiSizeLayout';

import styles from './InputPhone.module.scss';

import { UiElementHeightType, UiElementWidthType } from '@/types/ui';

type Props = {
  className?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  height?: UiElementHeightType;
  width?: UiElementWidthType;
  value: string;
  id: string;
};

export const InputPhone: FC<Props> = ({ className, disabled, onChange, height = 'md', width, value, id }) => {
  return (
    <UiSizeLayout width={width} height={height}>
      <div className={cn(styles.inputPhone, className)} id={id}>
        <ReactPhoneInput
          containerClass="input-phone__container"
          inputProps={{ autoComplete: 'off' }}
          onChange={onChange}
          disabled={disabled}
          value={value}
        />
      </div>
    </UiSizeLayout>
  );
};
