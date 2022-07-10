import cn from 'classnames';
import { FC, ReactNode } from 'react';

import styles from './FormBlock.module.scss';

type Props = {
  marginBottom?: 's1' | 's2' | 's3' | 's4' | 's5' | 's6' | 's7' | 's8' | 's9' | 's10';
  className?: string;
  children: ReactNode;
  alignH?: 'center';
};

export const FormBlock: FC<Props> = ({ marginBottom, className, children, alignH }) => {
  return (
    <div
      className={cn(
        styles.formBlock,
        {
          [styles[`formBlock_mb_${marginBottom}`]]: marginBottom,
          [styles[`formBlock_align_${alignH}`]]: alignH,
        },
        className
      )}
    >
      {children}
    </div>
  );
};
