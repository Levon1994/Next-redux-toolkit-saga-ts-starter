import cn from 'classnames';
import { CSSProperties, FC } from 'react';
import { IoIosAttach, IoIosClose } from 'react-icons/io';

import { ReactIcon } from '@/components/general/ReactIcon';
import { Typography } from '@/components/general/Typography';

import styles from './Attach.module.scss';

type Props = {
  backgroundColor?: 'primary' | 'secondary';
  disablePadding?: boolean;
  onDownload?: (name: string) => void;
  className?: string;
  readOnly?: boolean;
  onDelete: (id: number) => void;
  onOpen: () => void;
  style?: CSSProperties;
  limit?: number;
  title?: string;
  files: {
    name: string;
    size: string;
    id: number;
  }[];
  id: string;
};

export const Attach: FC<Props> = ({
  backgroundColor = 'primary',
  disablePadding,
  onDownload,
  className,
  readOnly,
  onDelete,
  onOpen,
  style,
  title = 'Attach files',
  limit = 100,
  files = [],
  id,
}) => {
  return (
    <div
      className={cn(styles.attach, {
        [styles.attach_disablePadding]: disablePadding,
        [styles[`attach_bgColor_${backgroundColor}`]]: backgroundColor,
        className,
      })}
      style={style}
      id={id}
    >
      <div className={styles.attach__header}>
        <div className={styles.attach__title}>
          <Typography variant="body2">{title}</Typography>
        </div>

        {!readOnly && (
          <div
            className={cn(styles.attach__button, {
              [styles.attach__button_disabled]: files.length === limit,
            })}
            onClick={files.length < limit ? onOpen : undefined}
          >
            <ReactIcon className={styles.attach__buttonIcon} size="md">
              <IoIosAttach />
            </ReactIcon>

            <Typography variant="body3">Attach</Typography>
          </div>
        )}
      </div>

      {!!files.length && (
        <ul className={styles.attach__list}>
          {files.map((file) => (
            <li
              className={styles.attach__listItem}
              key={file.id}
              {...(onDownload && {
                onClick: () => onDownload(file.name),
                style: { cursor: 'pointer' },
              })}
            >
              <ReactIcon className={styles.attach__listItemIcon} size="md">
                <IoIosAttach />
              </ReactIcon>

              <div className={styles.attach__listItemName} title={file.name}>
                <Typography variant="body2">{file.name}</Typography>
              </div>

              <span className={styles.attach__listItemSize}>
                <Typography variant="body2">{file.size} </Typography>
              </span>

              {!readOnly && (
                <ReactIcon className={styles.attach__listItemDel} onClick={() => onDelete(file.id)} size="lg">
                  <IoIosClose />
                </ReactIcon>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
