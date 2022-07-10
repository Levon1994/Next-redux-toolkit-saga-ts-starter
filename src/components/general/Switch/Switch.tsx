import cn from 'classnames';
import { ChangeEvent, FC } from 'react';

import styles from './Switch.module.scss';

type Props = {
  defaultChecked?: boolean;
  className?: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: boolean;
  size?: 'sm' | 'md';
  name: string;
  id: string;
};

export const Switch: FC<Props> = ({ defaultChecked, className, onChange, disabled, value, size = 'md', name, id }) => {
  return (
    <div
      className={cn(
        styles.switch,
        {
          [styles[`switch_size_${size}`]]: size,
          [styles.switch_disabled]: disabled,
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

      <label className={styles.switch__label} htmlFor={id}>
        <span className={styles.switch__button} />
      </label>
    </div>
  );
};
