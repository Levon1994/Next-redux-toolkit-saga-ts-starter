import cn from 'classnames';
import { FC, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ModalBase } from '@/components/general/modal/ModalBase';
import { ModalHeader } from '@/components/general/modal/ModalHeader';

import { modalActions, modalSelectors, modalTypes } from '@/store/branches/modal';

import styles from './SimpleModal.module.scss';

type Props = {
  isOpenCustom?: boolean;
  bodyHeight?: 'default' | 'full';
  noPadding?: boolean;
  closeIcon?: boolean;
  className?: string;
  onClose?: () => void;
  children: ReactNode;
  width?: 'xs' | 'sm' | 'md' | 'min-content' | 'full';
  title?: string;
  id: modalTypes.ModalNameType;
};

export const SimpleModal: FC<Props> = ({
  isOpenCustom,
  bodyHeight,
  noPadding,
  closeIcon = true,
  className,
  children,
  onClose,
  width,
  title,
  id,
}) => {
  const dispatch = useDispatch();

  const simpleModal = useSelector(modalSelectors.getSimpleModalState);

  const isModalOpen = simpleModal.modalName === id;
  const modalBaseProps = {
    bodyHeight,
    width,
    open: isOpenCustom || isModalOpen,
  };

  const closeSimpleModal = (): void => {
    dispatch(modalActions.closeSimpleModal());
  };

  return (
    <ModalBase {...modalBaseProps}>
      {(title || closeIcon) && <ModalHeader onClose={onClose || closeSimpleModal} title={title} />}
      <div
        className={cn(
          styles.simpleModal__content,
          {
            [styles.simpleModal__content_noPadding]: noPadding,
          },
          className
        )}
      >
        {children}
      </div>
    </ModalBase>
  );
};
