import cn from 'classnames';
import { FC } from 'react';

import { ModalFlowPending } from '@/components/general/modal/ModalFlowPending';
import { ModalFlowResult } from '@/components/general/modal/ModalFlowResult';
import { ModalFlowReviewForm } from '@/components/general/modal/ModalFlowReviewForm';

import { IModalConfig, IModalEvents, ModalFlowEnum } from '@/store/branches/modal/modal.types';

import styles from './ModalFlowContent.module.scss';

export type Props = {
  changeModalType: (type: ModalFlowEnum, data?: Record<string, any>) => void;
  clearCloseModal: () => void;
  modalConfig: IModalConfig;
  closeModal: () => void;
  className?: string;
  modalData?: Record<string, any>;
  modalType: ModalFlowEnum;
  id: string;
};

export const ModalFlowContent: FC<Props> = ({
  clearCloseModal,
  changeModalType,
  modalConfig: { beforeForm, form, review, pending, result },
  closeModal,
  modalData = {},
  modalType,
  className,
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const modalEvents: IModalEvents = {
    changeModalType,
    clearCloseModal,
    closeModal,
  };

  const content = (): JSX.Element | null => {
    switch (modalType) {
      case ModalFlowEnum.BEFORE_FORM:
        if (beforeForm && beforeForm.render) return <>{beforeForm.render({ modalData, modalEvents })}</>;

        return null;

      case ModalFlowEnum.FORM:
        if (form) return <>{form.render({ modalData, modalEvents })}</>;

        return null;

      case ModalFlowEnum.REVIEW:
        if (review && 'render' in review && review.render) return <>{review.render({ modalData, modalEvents })}</>;

        if (review && 'reviewViewProps' in review) {
          const reviewViewProps = review.reviewViewProps({ modalData, modalEvents });
          return <ModalFlowReviewForm {...reviewViewProps} />;
        }

        return null;

      case ModalFlowEnum.PENDING:
        if (pending && 'render' in pending && pending.render) return <>{pending.render({ modalData, modalEvents })}</>;

        return (
          <ModalFlowPending
            closeDialogHandler={modalEvents.clearCloseModal}
            message={pending && pending.message}
            title={pending && pending.title}
          />
        );

      case ModalFlowEnum.SUCCESS:
      case ModalFlowEnum.FAILURE:
        if (result && 'render' in result && result.render) {
          return <>{result.render({ modalData, modalType, modalEvents })}</>;
        }

        if (result && 'resultViewProps' in result) {
          const resultViewProps = result.resultViewProps({ modalData, modalType, modalEvents });

          return <ModalFlowResult {...resultViewProps} />;
        }

        return null;

      case ModalFlowEnum.CLOSED:
      default:
        return null;
    }
  };

  return content() ? <div className={cn(styles.modalFlowContent, className)}>{content()}</div> : null;
};
