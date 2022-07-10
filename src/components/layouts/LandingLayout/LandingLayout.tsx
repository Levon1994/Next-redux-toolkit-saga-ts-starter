import { FC, ReactNode } from 'react';

import { LandingFooter } from './LandingFooter';
import { LandingHeader } from './LandingHeader';
import styles from './LandingLayout.module.scss';

type Props = {
  children: ReactNode;
};

export const LandingLayout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.landingLayout}>
      <LandingHeader />

      <main className={styles.landingLayout__body}>{children}</main>

      <LandingFooter />
    </div>
  );
};
