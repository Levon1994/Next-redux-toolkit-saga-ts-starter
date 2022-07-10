import { FC } from 'react';

import { AuthPagesTypesEnum } from '@/configs/pages';
import { RoutePathsEnum } from '@/configs/routes';

import { ContentFrame } from '@/components/general/ContentFrame';
import { LinkButton } from '@/components/general/LinkButton';
import { Logo } from '@/components/general/Logo';

import styles from './AuthHeader.module.scss';

type Props = {
  page: AuthPagesTypesEnum | null;
};

export const AuthHeader: FC<Props> = ({ page }) => {
  return (
    <header className={styles.authHeader}>
      <ContentFrame>
        <div className={styles.authHeader__content}>
          <Logo />

          <div className={styles.authHeader__rightBlock}>
            {page === AuthPagesTypesEnum.SIGN_IN && (
              <LinkButton
                variant="outlined"
                height="sm"
                width="content"
                to={RoutePathsEnum.AUTH_SIGN_UP}
                id="auth-sign-up-link"
              >
                Sign up
              </LinkButton>
            )}
          </div>
        </div>
      </ContentFrame>
    </header>
  );
};
