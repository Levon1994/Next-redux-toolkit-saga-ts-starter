import { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { RoutePathsEnum } from '@/configs/routes';

import { FormStatusBlock } from '@/components/general/FormStatusBlock';

import { useConnectedAction } from '@/hooks/use-connected-action';

// import { errorMsg } from '@/services/notifications';
import { authActions } from '@/store/branches/auth';
import { getReqPending } from '@/store/branches/requests-pending/requests-pending.selectors';
import { RootState } from '@/store/root.types';

import { INewPasswordFormValues, NewPasswordForm } from './NewPasswordForm';

type Props = {
  token: string;
};

export const NewPasswordView: FC<Props> = ({ token }) => {
  const newPasswordReq = useConnectedAction(authActions.newPasswordReq);

  const isFetching = useSelector((state: RootState) => getReqPending(state, authActions.newPasswordReq.type));

  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const submitHandler = (values: INewPasswordFormValues): void => {
    setError('');
    newPasswordReq(
      { values, token },
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
        <FormStatusBlock text="Password changed successfully" backLink={RoutePathsEnum.AUTH_SIGN_IN} />
      ) : (
        <NewPasswordForm submitFetching={isFetching} onSubmit={submitHandler} error={error} />
      )}
    </>
  );
};
