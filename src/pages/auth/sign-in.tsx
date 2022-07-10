import React from 'react';

import { PagesTitlesEnum } from '@/configs/pages';

import { getLayout } from '@/components/layouts/AuthLayout';
import { SignInView } from '@/components/views/SignInView';

import { withAuth } from '@/utils/with-auth';

import { wrapper } from '@/store';

import { NextPageEnhanced } from '@/types/app';

const SignInPage: NextPageEnhanced = () => {
  return <SignInView />;
};

SignInPage.getLayout = getLayout;
SignInPage.title = PagesTitlesEnum.AUTH_SIGN_IN;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const isAuth = await withAuth(store, context, {
    onlyNotAuthorized: true,
  });

  if (isAuth) return isAuth;

  return { props: {} };
});

export default SignInPage;
