import cn from 'classnames';
import { DateTime } from 'luxon';
import { FC, FocusEvent } from 'react';
import ReactDatePicker from 'react-datepicker';
import { IoIosCalendar, IoMdCloseCircle } from 'react-icons/io';

import { ReactIcon } from '@/components/general/ReactIcon';
import { UiSizeLayout } from '@/components/layouts/UiSizeLayout';

import styles from './DatePicker.module.scss';

import { UiElementHeightType, UiElementWidthType } from '@/types/ui';

export type Props = {
  getCustomDateFormat?: (date: Date) => string | any;
  customConfig?: Record<string, any>;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  onChange: (date: string) => void;
  onClick?: () => void;
  onClear?: () => void;
  onBlur?: (e: FocusEvent<HTMLElement | HTMLInputElement>) => void;
  height?: UiElementHeightType;
  width?: UiElementWidthType;
  error?: boolean;
  value?: string;
  name: string;
  id: string;
};

export const DatePicker: FC<Props> = ({
  getCustomDateFormat,
  customConfig,
  placeholder,
  className,
  disabled,
  onChange,
  onClear,
  onBlur,
  height = 'md',
  width,
  error,
  value,
  name,
  id,
}) => {
  const config = {
    dateFormat: 'yyyy-MM-dd',
    ...customConfig,
  };

  const handleChange = (date: Date): void => {
    let modifiedDate = '';

    if (date) {
      if (getCustomDateFormat) {
        modifiedDate = getCustomDateFormat(date);
      } else {
        modifiedDate = DateTime.fromJSDate(date).toFormat('yyyy-MM-dd');
      }
    }

    onChange(modifiedDate);
  };

  return (
    <UiSizeLayout width={width} height={height}>
      <div
        className={cn(
          styles.datePicker,
          {
            [styles[`datePicker_rightBlock_${height}`]]: height,
            [styles.datePicker_error]: error,
          },
          className
        )}
        id={id}
      >
        <ReactDatePicker
          placeholderText={placeholder}
          showPopperArrow={false}
          onChange={handleChange}
          disabled={disabled}
          selected={(value && new Date(value)) || undefined}
          onBlur={onBlur}
          name={name}
          {...config}
        />

        <div
          className={cn(styles.datePicker__rightBlock, {
            [styles[`datePicker__rightBlock_${height}`]]: height,
          })}
        >
          {value && onClear ? (
            <ReactIcon onClick={onClear} size="md">
              <IoMdCloseCircle />
            </ReactIcon>
          ) : (
            <ReactIcon>
              <IoIosCalendar />
            </ReactIcon>
          )}
        </div>
      </div>
    </UiSizeLayout>
  );
};
