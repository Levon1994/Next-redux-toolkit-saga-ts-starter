import cn from 'classnames';
import { FC, ReactNode } from 'react';

import styles from './ReactIcon.module.scss';

type Props = {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  pointer?: boolean;
  rotate?: '90' | '180' | '270' | '360';
  color?: 'primaryDark' | 'secondary' | 'primary' | 'third' | 'valid' | 'error';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  id?: string;
};

export const ReactIcon: FC<Props> = ({
  className,
  children,
  pointer,
  onClick,
  rotate,
  color = 'primary',
  size = 'lg',
  id,
}) => {
  return (
    <div
      className={cn(
        styles.reactIcon,
        {
          [styles[`reactIcon_rotate_${rotate}`]]: rotate,
          [styles[`reactIcon_color_${color}`]]: color,
          [styles[`reactIcon_size_${size}`]]: size,
          [styles[`reactIcon_pointer`]]: pointer,
        },
        className
      )}
      onClick={onClick}
      id={id}
    >
      {children}
    </div>
  );
};
