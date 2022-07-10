import cn from 'classnames';
import RouterLink from 'next/link';
import { FC, ReactNode } from 'react';

import styles from './Link.module.scss';

type Props = {
  underline?: boolean;
  className?: string;
  children: ReactNode;
  to: string;
  id: string;
};

export const Link: FC<Props> = ({ underline, className, children, to, id }) => {
  return (
    <RouterLink href={to}>
      <a
        className={cn(
          styles.customLink,
          {
            [styles.customLink_underline]: underline,
          },
          className
        )}
        id={id}
      >
        {children}
      </a>
    </RouterLink>
  );
};
