import cn from 'classnames';
import { FC } from 'react';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';

import { ReactIcon } from '@/components/general/ReactIcon';
import { Typography } from '@/components/general/Typography';

import styles from './StatusCard.module.scss';

type Props = {
  className?: string;
  status: 'success' | 'error';
  text: string;
};

export const StatusCard: FC<Props> = ({ className, status, text }) => {
  return (
    <div className={cn(styles.statusCard, className)}>
      <div
        className={cn(styles.statusCard__iconWrapper, {
          [styles[`statusCard__iconWrapper_${status}`]]: status,
        })}
      >
        <ReactIcon size="xl">{status === 'success' ? <IoMdCheckmark /> : <IoMdClose />}</ReactIcon>
      </div>

      <Typography variant="body2" component="p">
        {text}
      </Typography>
    </div>
  );
};
