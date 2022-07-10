import cn from 'classnames';
import { FC, ReactNode } from 'react';

import { Typography } from '@/components/general/Typography';

import styles from './FormFieldLayout.module.scss';

interface IFormFieldStatus {
  error?: boolean;
  des?: string;
}

type Props = {
  rightContent?: ReactNode;
  blockTitle?: boolean;
  className?: string;
  withError?: boolean;
  subLabel?: string;
  children: ReactNode;
  status?: IFormFieldStatus;
  label?: string;
  id?: string;
};

export const FormFieldLayout: FC<Props> = ({
  rightContent,
  blockTitle,
  className,
  withError = true,
  subLabel,
  children,
  status: { error, des } = {},
  label,
  id = '',
}) => {
  return (
    <div
      className={cn(styles.formFieldLayout, {
        [styles.formFieldLayout_withError]: withError,
        className,
      })}
      id={id}
    >
      {(label || subLabel) && (
        <div
          className={cn(styles.formFieldLayout__label, {
            [styles.formFieldLayout__label_block]: blockTitle,
          })}
        >
          <Typography variant="body2">{label}</Typography>

          {subLabel && (
            <Typography variant="body4" color="textLight">
              {subLabel}
            </Typography>
          )}
        </div>
      )}

      {rightContent && <div className={styles.formFieldLayout__rightContent}>{rightContent}</div>}

      {children}

      {withError && error && des && (
        <div className={styles.formFieldLayout__des}>
          <Typography color="error" variant="body4">
            {des}
          </Typography>
        </div>
      )}
    </div>
  );
};
