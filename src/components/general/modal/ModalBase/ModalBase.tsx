import cn from 'classnames';
import { FC, ReactNode, useEffect } from 'react';

import { ClientSidePortalRp } from '@/components/render-props/ClientSidePortalRp';

import styles from './ModalBase.module.scss';

type Props = {
  bodyHeight?: 'default' | 'full';
  children: ReactNode;
  width?: 'xs' | 'sm' | 'md' | 'min-content' | 'full';
  open: boolean;
};

export const ModalBase: FC<Props> = ({ bodyHeight, children, width = 'sm', open }) => {
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        document.body.setAttribute('class', 'overflow-hidden');
      }, 250);
    } else {
      document.body.removeAttribute('class');
    }
  }, [open]);

  return (
    <ClientSidePortalRp>
      {open ? (
        <div
          className={cn(styles.modal, {
            [styles.modal_open]: open,
          })}
        >
          <div
            className={cn(styles.modal__content, {
              [styles[`modal__content_width_${width}`]]: width,
              [styles[`modal__content_bodyHeight_${bodyHeight}`]]: bodyHeight,
            })}
          >
            {children}
          </div>

          <div className={styles.modal__backdrop} />
        </div>
      ) : null}
    </ClientSidePortalRp>
  );
};
