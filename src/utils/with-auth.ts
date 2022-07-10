import { GetServerSidePropsContext } from 'next';
import { Store } from 'redux';
import { END, Task } from 'redux-saga';

import { AUTH_REDIRECT } from '@/configs/routes';

import { getToken } from '@/utils/get-token';
import { SspRedirect, sspRedirect } from '@/utils/redirect';

import { ISagaStore } from '@/store';
import { accountActions, accountUtils } from '@/store/branches/account';
import { RootState } from '@/store/root.types';

export interface IOptions {
  onlyNotAuthorized?: boolean;
  needAccessToken?: boolean;
  needAccount?: boolean;
}

/**
 * Helper for authentication checking in getServerSideProps method
 */
export const withAuth = async (
  store: Store<ISagaStore> & {
    sagaTask?: Task;
  },
  context: GetServerSidePropsContext,
  options: IOptions = {}
  // eslint-disable-next-line sonarjs/cognitive-complexity
): Promise<SspRedirect | undefined> => {
  const { onlyNotAuthorized, needAccessToken, needAccount } = options;
  const token = getToken(context);

  if (needAccessToken && !token) return sspRedirect();

  const getUser = async (): Promise<RootState | undefined> => {
    if (!token) return;

    store.dispatch(accountActions.getAccountReq({ token }));
    store.dispatch(END);

    if (store.sagaTask) await store.sagaTask.toPromise();

    return (store as ISagaStore).getState() as RootState;
  };

  if (needAccount && needAccessToken && token && !onlyNotAuthorized) {
    const state = await getUser();

    if (state && state.requestsErrors[accountActions.getAccountReq$error.type]) return sspRedirect();
  }

  if (onlyNotAuthorized && token) {
    const state = await getUser();

    if (state && accountUtils.isAccountExist(state.account.account)) {
      return sspRedirect(AUTH_REDIRECT);
    }
  }

  // eslint-disable-next-line sonarjs/no-redundant-jump
  return;
};
