import React from 'react';

import { PagesTitlesEnum } from '@/configs/pages';

import { getLayout } from '@/components/layouts/AuthLayout';
import { NewPasswordView } from '@/components/views/NewPasswordView';

import { sspRedirect } from '@/utils/redirect';

import { wrapper } from '@/store';

import { NextPageEnhanced } from '@/types/app';

type Props = {
  token: string | null;
};

const NewPasswordPage: NextPageEnhanced<Props> = ({ token }) => {
  return token ? <NewPasswordView token={token} /> : null;
};

NewPasswordPage.getLayout = getLayout;
NewPasswordPage.title = PagesTitlesEnum.AUTH_NEW_PASSWORD;

export const getServerSideProps = wrapper.getServerSideProps(() => async (context) => {
  if (!context.query.token) return sspRedirect();

  return {
    props: {
      token: (context.query.token as string) || null,
    },
  };
});

export default NewPasswordPage;
