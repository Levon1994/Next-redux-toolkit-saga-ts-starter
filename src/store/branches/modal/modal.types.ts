import { ReactNode } from 'react';

import { Props as ModalFlowResultProps } from '@/components/general/modal/ModalFlowResult';
import { Props as ModalFlowReviewFormProps } from '@/components/general/modal/ModalFlowReviewForm';

import { SimpleModalNamesEnum } from './modal.names';

export enum ModalFlowEnum {
  BEFORE_FORM = 'BEFORE_FORM',
  FORM = 'FORM',
  REVIEW = 'REVIEW',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  CLOSED = 'CLOSED',
}

export type ModalNameType = SimpleModalNamesEnum | null | string;

export interface IModalFlowData {
  modalType: ModalFlowEnum;
  modalData: Record<string, any>;
}
export interface ISimpleModalState {
  modalName: ModalNameType;
  modalData: Record<string, any> | null;
}

export interface IModalFlowsState {
  [key: string]: IModalFlowData;
}

export type IModalBranchState = {
  simpleModalState: ISimpleModalState;
  modalFlowsState: IModalFlowsState;
};

export interface IModalConfig {
  beforeForm?: IRenderFlowStep;
  pending?: IPendingFlowStep;
  result?: IRenderResultFlowStep | IResultViewProps;
  review?: IRenderFlowStep | IReviewViewProps;
  form?: IRenderFlowStep;
}

export interface IRenderFlowStep {
  render: ({ modalData, modalEvents }: { modalData: Record<string, any>; modalEvents: IModalEvents }) => ReactNode;
}

export interface IRenderResultFlowStep {
  render: ({
    modalEvents,
    modalData,
    modalType,
  }: {
    modalEvents: IModalEvents;
    modalData: Record<string, any>;
    modalType: ModalFlowEnum;
  }) => ReactNode;
}

export interface IModalEvents {
  changeModalType: (type: ModalFlowEnum, data?: Record<string, any>) => void;
  clearCloseModal: () => void;
  closeModal: () => void;
}

export interface IReviewViewProps {
  reviewViewProps: ({
    modalEvents,
    modalData,
  }: {
    modalEvents: IModalEvents;
    modalData: Record<string, any>;
  }) => ModalFlowReviewFormProps;
}

export interface IResultViewProps {
  resultViewProps: ({
    modalEvents,
    modalData,
    modalType,
  }: {
    modalEvents: IModalEvents;
    modalData: Record<string, any>;
    modalType: ModalFlowEnum;
  }) => ModalFlowResultProps;
}

export interface IPendingFlowStep {
  message?: string;
  render?: ({ modalData, modalEvents }: { modalData: Record<string, any>; modalEvents: IModalEvents }) => ReactNode;
  title?: string;
}
