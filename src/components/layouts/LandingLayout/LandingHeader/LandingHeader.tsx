import { FC } from 'react';
import { useSelector } from 'react-redux';

import { RoutePathsEnum } from '@/configs/routes';

import { ChangeLanguage } from '@/components/general/ChangeLanguage';
import { ContentFrame } from '@/components/general/ContentFrame';
import { LinkButton } from '@/components/general/LinkButton';
import { Logo } from '@/components/general/Logo';

import { accountSelectors, accountUtils } from '@/store/branches/account';

import styles from './LandingHeader.module.scss';

export const LandingHeader: FC = () => {
  const account = useSelector(accountSelectors.getAccount);

  const userLogged = accountUtils.isAccountExist(account);

  return (
    <header className={styles.landingHeader}>
      <ContentFrame>
        <div className={styles.landingHeader__content}>
          <Logo />

          <div className={styles.landingHeader__rightBlock}>
            <ChangeLanguage id="landing-header-change-language" />

            {!userLogged && (
              <>
                <LinkButton
                  className={styles.landingHeader__signUpButton}
                  variant="outlined"
                  height="sm"
                  width="content"
                  to={RoutePathsEnum.AUTH_SIGN_UP}
                  id="landing-sign-up-link"
                >
                  Sign up
                </LinkButton>

                <LinkButton
                  variant="contained"
                  height="sm"
                  width="content"
                  to={RoutePathsEnum.AUTH_SIGN_IN}
                  id="landing-sign-up-link"
                >
                  Sign in
                </LinkButton>
              </>
            )}
          </div>
        </div>
      </ContentFrame>
    </header>
  );
};
