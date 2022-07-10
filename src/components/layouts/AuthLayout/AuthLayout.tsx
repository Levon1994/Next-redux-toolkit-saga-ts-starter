import { FC, ReactNode } from 'react';

import { useAuthPageType } from '@/hooks/use-auth-page-type';

import { AuthHeader } from './AuthHeader';
import styles from './AuthLayout.module.scss';

type Props = {
  children: ReactNode;
};

export const AuthLayout: FC<Props> = ({ children }) => {
  const page = useAuthPageType();

  return (
    <div className={styles.authLayout}>
      <AuthHeader page={page} />

      <main>{children}</main>
    </div>
  );
};

export const getLayout = (page: ReactNode): JSX.Element => <AuthLayout>{page}</AuthLayout>;
