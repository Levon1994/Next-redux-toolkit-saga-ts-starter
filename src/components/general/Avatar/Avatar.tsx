import cn from 'classnames';
import { FC, MouseEventHandler } from 'react';

import { AVATAR_DEFAULT_IMAGE } from '@/configs/images';

import styles from './Avatar.module.scss';

type Props = {
  withBorder?: boolean;
  className?: string;
  onClick?: MouseEventHandler;
  avatar?: string;
  size?: 'xs' | 'sm' | 'lg' | number;
  id: string;
};

export const Avatar: FC<Props> = ({ withBorder, className, onClick, avatar, size = 'xs', id }) => {
  return (
    <div
      className={cn(
        styles.avatar,
        {
          [styles.avatar_withBorder]: withBorder,
          [styles.avatar_withClick]: onClick,
          ...(typeof size === 'string' && { [styles[`avatar_${size}`]]: size }),
        },
        className
      )}
      onClick={onClick ?? undefined}
      style={
        typeof size === 'number'
          ? {
              height: size,
              width: size,
            }
          : {}
      }
      id={id}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="img-cover" src={avatar || AVATAR_DEFAULT_IMAGE} alt="account-avatar" />
    </div>
  );
};
