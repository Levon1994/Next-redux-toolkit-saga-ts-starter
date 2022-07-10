import cn from 'classnames';
import { FC } from 'react';

import { Loader } from '@/components/general/Loader';
import { ModalContentTemplate } from '@/components/general/modal/ModalContentTemplate';
import { Typography } from '@/components/general/Typography';

import styles from './ModalFlowPending.module.scss';

type IProps = {
  closeDialogHandler: () => void;
  className?: string;
  message?: string;
  title?: string;
};

export const ModalFlowPending: FC<IProps> = ({
  closeDialogHandler,
  className,
  message = 'Please wait, the action is in progress...',
  title = 'Processing',
}) => {
  return (
    <ModalContentTemplate onClose={closeDialogHandler} title={title}>
      <div className={cn(styles.modalFlowPending, className)}>
        <Loader className={styles.modalFlowPending__loader} />

        <Typography>{message}</Typography>
      </div>
    </ModalContentTemplate>
  );
};
