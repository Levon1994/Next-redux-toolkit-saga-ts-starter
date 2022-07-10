import { FC } from 'react';

import { Typography } from '@/components/general/Typography';

import styles from './DashboardView.module.scss';

export const DashboardView: FC = () => {
  return (
    <div className={styles.dashboardView}>
      <Typography>Dashboard page</Typography>
    </div>
  );
};
