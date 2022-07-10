import { FC } from 'react';

import { Typography } from '@/components/general/Typography';

import styles from './LandingFooter.module.scss';

export const LandingFooter: FC = () => {
  return (
    <header className={styles.landingFooter}>
      <Typography variant="subtitle1" align="center">
        Footer
      </Typography>
    </header>
  );
};
