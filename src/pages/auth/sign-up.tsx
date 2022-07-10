import React from 'react';

import { PagesTitlesEnum } from '@/configs/pages';

import { getLayout } from '@/components/layouts/AuthLayout';
import { SignUpView } from '@/components/views/SignUpView';

import { withAuth } from '@/utils/with-auth';

import { wrapper } from '@/store';

import { NextPageEnhanced } from '@/types/app';

const SignUpPage: NextPageEnhanced = () => {
  return <SignUpView />;
};

SignUpPage.getLayout = getLayout;
SignUpPage.title = PagesTitlesEnum.AUTH_SIGN_UP;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const isAuth = await withAuth(store, context, {
    onlyNotAuthorized: true,
  });

  if (isAuth) return isAuth;

  return {
    props: {},
  };
});

export default SignUpPage;
