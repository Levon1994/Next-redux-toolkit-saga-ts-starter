import { FC } from 'react';
import { useSelector } from 'react-redux';

import { useConnectedAction } from '@/hooks/use-connected-action';

import { errorMsg } from '@/services/notifications';

import { authActions } from '@/store/branches/auth';
import { requestsErrorsActions } from '@/store/branches/requests-errors';
import { getReqPending } from '@/store/branches/requests-pending/requests-pending.selectors';
import { RootState } from '@/store/root.types';

import { ISignInFormValues, SignInForm } from './SignInForm';

export const SignInView: FC = () => {
  const deleteError = useConnectedAction(requestsErrorsActions.deleteError);
  const signInReq = useConnectedAction(authActions.signInReq);

  const isFetching = useSelector((state: RootState) => getReqPending(state, authActions.signInReq.type));

  const submitHandler = (values: ISignInFormValues): void => {
    signInReq(
      { values },
      {
        onError: (data) => {
          if (data?.message) {
            errorMsg(data.message, {
              onRemoval: () => {
                deleteError(authActions.signInReq$error.type);
              },
            });
          }
        },
      }
    );
  };

  return <SignInForm submitFetching={isFetching} onSubmit={submitHandler} />;
};
