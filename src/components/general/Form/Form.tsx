import cn from 'classnames';
import { FC, FormEvent, ReactNode } from 'react';

import styles from './Form.module.scss';

type Props = {
  className?: string;
  children: ReactNode;
  onSubmit: (values: Record<string, any> & FormEvent<HTMLFormElement>) => void;
  width?: 'md' | 'full';
};

export const Form: FC<Props> = ({ className, children, onSubmit, width = 'md' }) => {
  return (
    <form
      className={cn(
        styles.form,
        {
          [styles[`form_width_${width}`]]: width,
        },
        className
      )}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};
