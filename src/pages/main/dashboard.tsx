import React from 'react';

import { PagesTitlesEnum } from '@/configs/pages';

import { getLayout } from '@/components/layouts/MainLayout';
import { DashboardView } from '@/components/views/DashboardView';

import { withAuth } from '@/utils/with-auth';

import { wrapper } from '@/store';

import { NextPageEnhanced } from '@/types/app';

const DashboardPage: NextPageEnhanced = () => {
  return <DashboardView />;
};

DashboardPage.getLayout = getLayout;
DashboardPage.title = PagesTitlesEnum.MAIN_DASHBOARD;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const isAuth = await withAuth(store, context, {
    needAccessToken: true,
    needAccount: true,
  });

  if (isAuth) return isAuth;

  return { props: {} };
});

export default DashboardPage;
