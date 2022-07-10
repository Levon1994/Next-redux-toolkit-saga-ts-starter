import React from 'react';

import { PagesTitlesEnum } from '@/configs/pages';

import { getLayout } from '@/components/layouts/AuthLayout';
import { ResetPasswordView } from '@/components/views/ResetPasswordView';

import { withAuth } from '@/utils/with-auth';

import { wrapper } from '@/store';

import { NextPageEnhanced } from '@/types/app';

const ResetPasswordPage: NextPageEnhanced = () => {
  return <ResetPasswordView />;
};

ResetPasswordPage.getLayout = getLayout;
ResetPasswordPage.title = PagesTitlesEnum.AUTH_RESET_PASSWORD;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const isAuth = await withAuth(store, context, {
    onlyNotAuthorized: true,
  });

  if (isAuth) return isAuth;

  return { props: {} };
});

export default ResetPasswordPage;
