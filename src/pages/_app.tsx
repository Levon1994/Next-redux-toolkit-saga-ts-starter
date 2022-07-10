import Head from 'next/head';
import Router from 'next/router';
import { useEffect, useRef } from 'react';
import { ReactNotifications } from 'react-notifications-component';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import '../styles/index.scss';

import { TITLE_BASE_PREFIX } from '@/configs/system';

import { AppLayout } from '@/components/layouts/AppLayout';

import { useBodyBackground } from '@/hooks/use-body-background';
import { useConnectedAction } from '@/hooks/use-connected-action';
import { useIdleUserTimer } from '@/hooks/use-idle-user-timer';
import { usePersistLocaleCookie } from '@/hooks/use-persist-locale-cookie';
import { usePersistPaletteLocalStorage } from '@/hooks/use-persist-palette-local-storage';
import { useWindowInnerHeight } from '@/hooks/use-window-inner-height';

import { isServer } from '@/utils/is-server';

import { wrapper } from '@/store';
import { systemActions } from '@/store/branches/system';

import { AppProps, Page } from '@/types/app';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const getLayout = Component.getLayout || ((page: Page) => page);
  const title = Component.title || '';
  const modifiedAsSubTitle = title ? ` | ${title}` : '';

  const initializeApp = useConnectedAction(systemActions.initializeApp);
  const loader = useRef<LoadingBarRef | null>(null);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  usePersistPaletteLocalStorage();
  usePersistLocaleCookie();
  useWindowInnerHeight();
  useBodyBackground();
  useIdleUserTimer();

  const setBrowserConfig = (): void => {
    Router.events.on('routeChangeStart', () => {
      if (loader.current) loader.current.continuousStart(10, 10);
    });

    Router.events.on('routeChangeComplete', () => {
      if (loader.current) loader.current.complete();
      // Set page scroll to top (if needed)
      const elements = document.getElementsByClassName('scroll');

      if (!elements.length) return;

      let i = 0;

      while (i < elements.length) {
        elements[i].scrollTop = 0;
        i++;
      }
    });

    Router.events.on('routeChangeError', () => {
      if (loader.current) loader.current.complete();
    });
  };

  if (!isServer()) {
    setBrowserConfig();
  }

  return (
    <>
      <Head>
        <title>{`${TITLE_BASE_PREFIX}${modifiedAsSubTitle}`}</title>
      </Head>

      <>
        {/* App layout wrapper */}
        <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
        {/* App loading bar */}
        <div className="app__indicator-wrapper">
          <LoadingBar shadow={false} height={3} color="var(--secondaryLight)" ref={loader} />
        </div>
        {/* App notifications container */}
        <ReactNotifications />
      </>
    </>
  );
};

export default wrapper.withRedux(App);
