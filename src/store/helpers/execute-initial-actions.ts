import { AnyAction } from '@reduxjs/toolkit';

import { ISagaStore } from '..';

const getActionObject = (action: any): any => {
  return typeof action === 'function' ? action() : action;
};

export const executeInitialActions = async (store: ISagaStore, actions: AnyAction[] = []): Promise<void> => {
  const [firstStageActions, holdActions] = actions.reduce(
    (arrays: any, action: AnyAction) => {
      if (typeof action === 'object') {
        if (action.postpone) {
          arrays[1].push(getActionObject(action.action));
        } else {
          arrays[0].push(action);
        }
      } else {
        arrays[0].push(getActionObject(action));
      }

      return arrays;
    },
    [[], []]
  );

  await Promise.all(
    firstStageActions.map((action: any) => {
      let originalAction = action;

      if (typeof action === 'function') {
        originalAction = action();
      }

      return store.dispatch({
        ...originalAction,
      });
    })
  );

  if (holdActions.length) {
    const actions = [
      ...holdActions.slice(0, 1),
      ...holdActions.slice(1).map((action: any) => ({
        action,
        postpone: true,
      })),
    ];

    await executeInitialActions(store, actions);
  }
};
