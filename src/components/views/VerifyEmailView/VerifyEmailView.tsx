import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RoutePathsEnum } from '@/configs/routes';

import { FormStatusBlock } from '@/components/general/FormStatusBlock';
import { Loader } from '@/components/general/Loader';
import { Typography } from '@/components/general/Typography';

import { useConnectedAction } from '@/hooks/use-connected-action';

import { authActions } from '@/store/branches/auth';
import { getReqPending } from '@/store/branches/requests-pending/requests-pending.selectors';
import { RootState } from '@/store/root.types';

type Props = {
  token: string;
};

export const VerifyEmailView: FC<Props> = ({ token }) => {
  const verifyEmailReq = useConnectedAction(authActions.verifyEmailReq);

  const isFetching = useSelector((state: RootState) => getReqPending(state, authActions.verifyEmailReq.type));

  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    verifyEmailReq(
      { token },
      {
        onSuccess: () => setSuccess(true),
        onError: (data) => {
          if (data && data.message) {
            setError(data.message);
          }
        },
      }
    );
  }, [verifyEmailReq, token]);

  if (isFetching) {
    return (
      <div>
        <Typography variant="body1">Email verifying...</Typography>

        <Loader />
      </div>
    );
  }

  return (
    <div>
      {isSuccess ? (
        <FormStatusBlock backLink={RoutePathsEnum.AUTH_SIGN_IN} text="Email verified successfully" />
      ) : (
        <FormStatusBlock backLink={RoutePathsEnum.AUTH_SIGN_IN} status={false} text={error} />
      )}
    </div>
  );
};
