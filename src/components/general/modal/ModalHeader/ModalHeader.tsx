import { FC } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';

import { ReactIcon } from '@/components/general/ReactIcon';
import { Typography } from '@/components/general/Typography';

import styles from './ModalHeader.module.scss';

type Props = {
  onClose?: () => void;
  title?: string;
};

export const ModalHeader: FC<Props> = ({ onClose, title }) => {
  return onClose || title ? (
    <div className={styles.modalHeader}>
      {title && (
        <Typography variant="h3" noWrap>
          {title}
        </Typography>
      )}

      {onClose && (
        <ReactIcon className={styles.modalHeader__closeBtn} onClick={onClose} size="xl">
          <IoMdCloseCircle />
        </ReactIcon>
      )}
    </div>
  ) : null;
};
