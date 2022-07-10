import { AnyAction } from '@reduxjs/toolkit';

export const createActionName = (branchNamePrefix: string, actionPiece: string): string => {
  return `${branchNamePrefix}/${actionPiece}`;
};

export const isPendingReqAction = (action: AnyAction): boolean => {
  return action.type.endsWith('Req');
};

export const isSuccessReqAction = (action: AnyAction): boolean => {
  return action.type.endsWith('Req$success');
};

export const isErrorReqAction = (action: AnyAction): boolean => {
  return action.type.endsWith('Req$error');
};

export const getOriginReqActionName = (type: string): string => {
  return type.slice(0, type.lastIndexOf('$'));
};
