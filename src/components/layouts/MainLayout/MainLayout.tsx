import { FC, ReactNode } from 'react';

import { MainHeader } from './MainHeader';
import styles from './MainLayout.module.scss';
import { MainSidebar } from './MainSidebar';

type Props = {
  children: ReactNode;
};

export const MainLayout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.mainLayout}>
      <MainHeader />

      <MainSidebar />

      <main>{children}</main>
    </div>
  );
};

export const getLayout = (page: ReactNode): JSX.Element => <MainLayout>{page}</MainLayout>;
