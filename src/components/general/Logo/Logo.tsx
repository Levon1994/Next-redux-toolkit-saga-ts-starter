import { useRouter } from 'next/router';
import { FC, MouseEvent } from 'react';

import { RoutePathsEnum } from '@/configs/routes';

import { Typography } from '@/components/general/Typography';

import styles from './Logo.module.scss';

export const Logo: FC = () => {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLElement>): void => {
    e.preventDefault();

    if (router.pathname === RoutePathsEnum.HOME) return;

    router.push(RoutePathsEnum.HOME);
  };

  return (
    <div className={styles.logo} onClick={handleClick}>
      <Typography variant="h2" align="center">
        Next.js starter
      </Typography>
    </div>
  );
};
