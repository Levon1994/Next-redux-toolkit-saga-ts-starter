import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ModalBase } from '@/components/general/modal/ModalBase';
import { ModalFlowContent } from '@/components/general/modal/ModalFlowContent';

import { modalActions, modalSelectors, modalTypes } from '@/store/branches/modal';
import { RootState } from '@/store/root.types';

type Props = {
  modalConfig: modalTypes.IModalConfig;
  bodyHeight?: 'default' | 'full';
  className?: string;
  width?: 'xs' | 'sm' | 'md' | 'min-content' | 'full';
  id: string;
};

export const ModalFlow: FC<Props> = ({ modalConfig, bodyHeight, className, width, id }) => {
  const dispatch = useDispatch();

  const modalFlow = useSelector((state: RootState) => modalSelectors.getModalFlowState(state, id));

  if (!modalFlow) return null;

  const isModalFlowOpen = modalFlow.modalType !== modalTypes.ModalFlowEnum.CLOSED;
  const modalBaseProps = { bodyHeight, width, open: isModalFlowOpen };

  const changeModalType = (type: modalTypes.ModalFlowEnum, data?: Record<string, any>): void => {
    dispatch(modalActions.changeFlowModalType({ modalId: id, modalType: type, modalData: data }));
  };

  const closeModal = (): void => {
    dispatch(modalActions.closeModalFlow({ modalId: id }));
  };

  const clearCloseModal = (): void => {
    dispatch(modalActions.clearCloseModalFlow({ modalId: id }));
  };

  return (
    <ModalBase {...modalBaseProps}>
      <ModalFlowContent
        changeModalType={changeModalType}
        clearCloseModal={clearCloseModal}
        modalConfig={modalConfig}
        closeModal={closeModal}
        modalType={modalFlow.modalType}
        modalData={modalFlow.modalData}
        className={className}
        id={id}
      />
    </ModalBase>
  );
};
