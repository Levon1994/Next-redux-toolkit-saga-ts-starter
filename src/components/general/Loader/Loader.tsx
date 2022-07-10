import cn from 'classnames';
import { FC } from 'react';

import styles from './Loader.module.scss';

export type Props = {
  className?: string;
  color?: 'primary' | 'secondary' | 'onSecondary';
  style?: Record<string, string>;
  size?: 'sm' | 'md' | 'lg';
};

export const Loader: FC<Props> = ({ className, color = 'secondary', style, size = 'md' }) => {
  return (
    <div
      className={cn(
        styles.loader,
        {
          [styles[`loader_color_${color}`]]: color,
          [styles[`loader_size_${size}`]]: size,
        },
        className
      )}
      style={style}
    />
  );
};
