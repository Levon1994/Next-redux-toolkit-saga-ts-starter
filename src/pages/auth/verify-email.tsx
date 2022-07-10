import React from 'react';

import { PagesTitlesEnum } from '@/configs/pages';

import { getLayout } from '@/components/layouts/AuthLayout';
import { VerifyEmailView } from '@/components/views/VerifyEmailView';

import { sspRedirect } from '@/utils/redirect';

import { wrapper } from '@/store';

import { NextPageEnhanced } from '@/types/app';

type Props = {
  token: string | null;
};

const VerifyEmailPage: NextPageEnhanced<Props> = ({ token }) => {
  return token ? <VerifyEmailView token={token} /> : null;
};

VerifyEmailPage.getLayout = getLayout;
VerifyEmailPage.title = PagesTitlesEnum.AUTH_VERIFY_EMAIL;

export const getServerSideProps = wrapper.getServerSideProps(() => async (context) => {
  if (!context.query.token) return sspRedirect();

  return {
    props: {
      token: (context.query.token as string) || null,
    },
  };
});

export default VerifyEmailPage;
