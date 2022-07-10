import { useIdleTimer } from 'react-idle-timer';
import { useStore } from 'react-redux';

import { logger } from '@/utils/logger';

import { ISagaStore } from '@/store';
import { authActions } from '@/store/branches/auth';

/**
 * Get a hook-function to use user idle timer
 * Set user idle checking (onIdle / onActive / onAction)
 */
export const useIdleUserTimer = (): void => {
  const store = useStore() as ISagaStore;

  const handleOnIdle = (): void => {
    logger('User is idle');
    logger('Last active', getLastActiveTime());

    store.dispatch(authActions.signOut());
  };

  const handleOnActive = (): void => {
    logger('Time remaining', getRemainingTime());
  };

  const handleOnAction = (): void => {
    logger('User did something');
  };

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
    timeout: 1000 * 60 * 60, // TODO: Add timeout to ENV file
    onIdle: handleOnIdle,
  });
};
