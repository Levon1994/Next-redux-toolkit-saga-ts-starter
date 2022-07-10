import cn from 'classnames';
import { ChangeEvent, FC, FocusEvent, ReactNode } from 'react';

import { UiSizeLayout } from '@/components/layouts/UiSizeLayout';

import styles from './Input.module.scss';

import { UiElementHeightType, UiElementWidthType } from '@/types/ui';

export type Props = {
  placeholder?: string;
  rightBlock?: ReactNode;
  className?: string;
  pattern?: RegExp;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  height?: UiElementHeightType;
  width?: UiElementWidthType;
  error?: boolean;
  type?: 'password' | 'text';
  value: string;
  name: string;
  id: string;
};

export const Input: FC<Props> = ({
  placeholder,
  rightBlock,
  className,
  onChange,
  pattern,
  onFocus,
  onBlur,
  height = 'md',
  width,
  error,
  value,
  name,
  type = 'text',
  id,
  ...rest
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (pattern) {
      const value = e.target.value;

      if (!value.match(pattern) && value !== '') {
        e.preventDefault();
      } else {
        onChange(e);
      }
    } else {
      onChange(e);
    }
  };

  return (
    <UiSizeLayout width={width} height={height}>
      <div
        className={cn(
          styles.input,
          {
            [styles[`input_rightBlock_${height}`]]: rightBlock && height,
            [styles.input_error]: error,
          },
          className
        )}
      >
        <input
          autoComplete={type === 'password' ? 'new-password' : 'off'}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          name={name}
          type={type}
          id={id}
          {...rest}
        />

        {rightBlock && (
          <div
            className={cn({
              [styles.input__rightBlock]: true,
              [styles[`input__rightBlock_${height}`]]: rightBlock && height,
            })}
          >
            {rightBlock}
          </div>
        )}
      </div>
    </UiSizeLayout>
  );
};
