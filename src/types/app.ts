import { NextComponentType, NextPage, NextPageContext } from 'next';
import { AppInitialProps } from 'next/app';
import { Router as ClientRouter } from 'next/dist/client/router';
import ServerRouter from 'next/dist/server/router';

import { PagesTitlesEnum } from '@/configs/pages';

export type AppProps = AppInitialProps & {
  Component: NextComponentType<NextPageContext, any, Record<string, unknown>> & {
    getLayout?: any;
    title?: PagesTitlesEnum;
  };
  router: ServerRouter | ClientRouter;
  __N_SSG?: boolean | undefined;
  __N_SSP?: boolean | undefined;
};

export type Page = NextComponentType<NextPageContext, any, Record<string, unknown>>;

export type NextPageEnhanced<P = Record<string, any>, IP = P> = NextPage<P, IP> & {
  getLayout?: any;
  title?: PagesTitlesEnum;
};

export interface IPageConfig {
  bodyBackgroundColor?: string;
}

export interface IPagesCommonConfig {
  [path: string]: IPageConfig;
}
