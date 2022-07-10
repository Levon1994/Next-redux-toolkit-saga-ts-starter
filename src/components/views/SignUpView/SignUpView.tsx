import { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { RoutePathsEnum } from '@/configs/routes';

import { FormStatusBlock } from '@/components/general/FormStatusBlock';

import { useConnectedAction } from '@/hooks/use-connected-action';

// import { errorMsg } from '@/services/notifications';
import { authActions } from '@/store/branches/auth';
import { getReqPending } from '@/store/branches/requests-pending/requests-pending.selectors';
import { RootState } from '@/store/root.types';

import { ISignUpFormValues, SignUpForm } from './SignUpForm';

export const SignUpView: FC = () => {
  const signUpReq = useConnectedAction(authActions.signUpReq);

  const isFetching = useSelector((state: RootState) => getReqPending(state, authActions.signUpReq.type));

  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const submitHandler = (values: ISignUpFormValues): void => {
    setError('');
    signUpReq(
      { values },
      {
        onSuccess: () => setSuccess(true),
        onError: (data) => {
          if (data?.message) {
            // errorMsg(data.message);
            setError(data.message);
          }
        },
      }
    );
  };

  return (
    <>
      {isSuccess ? (
        <FormStatusBlock text="Registration was successfully" backLink={RoutePathsEnum.AUTH_SIGN_IN} />
      ) : (
        <SignUpForm submitFetching={isFetching} onSubmit={submitHandler} error={error} />
      )}
    </>
  );
};
