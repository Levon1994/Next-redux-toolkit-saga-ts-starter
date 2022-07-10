import cn from 'classnames';
import { FC, ReactNode } from 'react';

import styles from './ContentFrame.module.scss';

type Props = {
  className?: string;
  children: ReactNode;
  fluid?: boolean;
};

export const ContentFrame: FC<Props> = ({ className, children, fluid }) => {
  return (
    <div
      className={cn(
        styles.contentFrame,
        {
          [styles.contentLimiter_fluid]: fluid,
        },
        className
      )}
    >
      {children}
    </div>
  );
};
