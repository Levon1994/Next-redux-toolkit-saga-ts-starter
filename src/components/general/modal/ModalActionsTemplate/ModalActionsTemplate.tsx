import cn from 'classnames';
import { FC, ReactChild, ReactNode } from 'react';

import styles from './ModalActionsTemplate.module.scss';

type Props = {
  className?: string;
  noPadding?: boolean;
  onClose?: () => void;
  children: ReactNode;
};

export const ModalActionsTemplate: FC<Props> = ({ noPadding, children, className }) => {
  const buttonsQuantity = children && (children as ReactChild[]).length;

  return (
    <div
      className={cn(
        styles.modalActionsTemplate,
        {
          [styles.modalActionsTemplate_noPadding]: noPadding,
        },
        className
      )}
      data-buttons-quantity={buttonsQuantity}
    >
      {children}
    </div>
  );
};
