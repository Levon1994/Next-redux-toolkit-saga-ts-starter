import cn from 'classnames';
import { FC, ReactNode } from 'react';

import { ModalHeader } from '@/components/general/modal/ModalHeader';

import styles from './ModalContentTemplate.module.scss';

type Props = {
  noPadding?: boolean;
  closeIcon?: boolean;
  onClose?: () => void;
  children: ReactNode;
  title?: string;
};

export const ModalContentTemplate: FC<Props> = ({ noPadding, closeIcon = true, children, onClose, title }) => {
  return (
    <>
      {(title || closeIcon) && <ModalHeader onClose={onClose} title={title} />}

      <div
        className={cn(styles.modalContentTemplate__body, {
          [styles.modalContentTemplate__body_noPadding]: noPadding,
        })}
      >
        {children}
      </div>
    </>
  );
};
