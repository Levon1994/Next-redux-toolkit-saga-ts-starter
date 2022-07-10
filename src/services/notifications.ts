import { iNotification, Store } from 'react-notifications-component';

import { upperFirst } from '@/utils/upper-first';

export enum NotificationTypesEnum {
  SUCCESS = 'success',
  DEFAULT = 'default',
  WARNING = 'warning',
  ERROR = 'danger',
  INFO = 'info',
}

const notify = (message: string, type: NotificationTypesEnum, params?: Partial<iNotification>): string => {
  return Store.addNotification({
    animationOut: ['animate__animated', 'animate__zoomOut'],
    animationIn: ['animate__animated', 'animate__fadeIn'],
    container: 'bottom-right',
    message,
    insert: 'bottom',
    title: type === NotificationTypesEnum.ERROR ? upperFirst('error') : upperFirst(type),
    type,
    ...params,
  });
};

export const defaultMsg = (message: string, params?: Partial<iNotification>): string => {
  return notify(message, NotificationTypesEnum.DEFAULT, params);
};

export const infoMsg = (message: string, params?: Partial<iNotification>): string => {
  return notify(message, NotificationTypesEnum.INFO, params);
};

export const successMsg = (message: string, params?: Partial<iNotification>): string => {
  return notify(message, NotificationTypesEnum.SUCCESS, params);
};

export const warningMsg = (message: string, params?: Partial<iNotification>): string => {
  return notify(message, NotificationTypesEnum.WARNING, params);
};

export const errorMsg = (message: string, params?: Partial<iNotification>): string => {
  return notify(message, NotificationTypesEnum.ERROR, params);
};

export const removeMsg = (id: string): void => {
  Store.removeNotification(id);
};
