import cn from 'classnames';
import { ChangeEvent, FC, FocusEvent } from 'react';

import { Typography } from '@/components/general/Typography';
import { UiSizeLayout } from '@/components/layouts/UiSizeLayout';

import styles from './Textarea.module.scss';

import { UiElementHeightType, UiElementWidthType } from '@/types/ui';

type Props = {
  disableBorder?: boolean;
  placeholder?: string;
  lengthSide?: 'left' | 'right';
  className?: string;
  readOnly?: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  height?: UiElementHeightType;
  length?: number;
  width?: UiElementWidthType;
  error?: boolean;
  type?: 'password' | 'text';
  value: string;
  name: string;
  id: string;
};

export const Textarea: FC<Props> = ({
  disableBorder,
  placeholder,
  lengthSide = 'right',
  className,
  onChange,
  readOnly,
  onFocus,
  onBlur,
  height = 'full',
  length,
  error,
  width = 'full',
  value,
  name,
  id,
  ...rest
}) => {
  return (
    <UiSizeLayout width={width} height={height}>
      <div
        className={cn(
          styles.textarea,
          {
            [styles.textarea_disableBorder]: disableBorder,
            [styles.textarea_error]: error,
          },
          className
        )}
      >
        <textarea
          placeholder={placeholder}
          onChange={onChange}
          readOnly={readOnly}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          name={name}
          id={id}
          {...rest}
        />

        {length && !error && (
          <div
            className={cn(styles.textarea__lengthBlock, {
              [styles[`textarea__lengthBlock_side_${lengthSide}`]]: lengthSide,
            })}
          >
            <Typography variant="body4" color="textLight">
              {value ? value.length : 0} / {length}
            </Typography>
          </div>
        )}
      </div>
    </UiSizeLayout>
  );
};
