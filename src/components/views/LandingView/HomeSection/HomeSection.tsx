import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { FC } from 'react';

import { ContentFrame } from '@/components/general/ContentFrame';
import { Typography } from '@/components/general/Typography';

import styles from './HomeSection.module.scss';

export const HomeSection: FC = () => {
  const { t } = useTranslation('common');

  return (
    <div className={styles.homeSection}>
      <ContentFrame>
        <Typography variant="h1" align="center">
          {t('pages.landing.title')}
        </Typography>

        <ul>
          <li>
            <Link href="/auth/sign-in">
              <a>Sign in</a>
            </Link>
          </li>

          <li>
            <Link href="/auth/sign-up">
              <a>Sign up</a>
            </Link>
          </li>

          <li>
            <Link href="/main/dashboard">
              <a>Dashboard</a>
            </Link>
          </li>
        </ul>
      </ContentFrame>
    </div>
  );
};
