import { FC } from 'react';

import { AccountInfo } from '@/components/general/AccountInfo';
import { ContentFrame } from '@/components/general/ContentFrame';
import { Logo } from '@/components/general/Logo';

import styles from './MainHeader.module.scss';

export const MainHeader: FC = () => {
  return (
    <header className={styles.mainHeader}>
      <ContentFrame>
        <div className={styles.mainHeader__content}>
          <Logo />

          <div className={styles.mainHeader__rightBlock}>
            <AccountInfo />
          </div>
        </div>
      </ContentFrame>
    </header>
  );
};
