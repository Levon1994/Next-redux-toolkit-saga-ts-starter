import { FC, ReactNode } from 'react';

import { Typography } from '@/components/general/Typography';

import styles from './styles.module.scss';

type Props = {
  children: ReactNode;
  title: string;
};

export const ExampleViewCard: FC<Props> = ({ children, title }) => {
  return (
    <div className={styles.exampleViewCard}>
      <div className={styles.exampleViewCard__titleWrapper}>
        <Typography variant="h4">{title}</Typography>
      </div>

      <div className={styles.exampleViewCard__contentWrapper}>{children}</div>
    </div>
  );
};
