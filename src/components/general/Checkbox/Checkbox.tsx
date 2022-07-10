import cn from 'classnames';
import { ChangeEvent, FC } from 'react';
import { IoMdCheckmark } from 'react-icons/io';

import styles from './Checkbox.module.scss';

type Props = {
  defaultChecked?: boolean;
  className?: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: boolean;
  size?: string;
  name: string;
  id: string;
};

export const Checkbox: FC<Props> = ({ defaultChecked, className, onChange, disabled, value, size, name, id }) => {
  return (
    <div
      className={cn(
        styles.checkbox,
        {
          [styles[`checkbox_size_${size}`]]: size,
          [styles.checkbox_disabled]: disabled,
        },
        className
      )}
    >
      <input
        defaultChecked={defaultChecked}
        onChange={onChange}
        disabled={disabled}
        checked={value}
        type="checkbox"
        name={name}
        id={id}
      />

      <label className={styles.checkbox__label} htmlFor={id}>
        <span className={styles.checkbox__icon}>
          <IoMdCheckmark />
        </span>
      </label>
    </div>
  );
};
