import cn from 'classnames';
import { FC, ReactNode } from 'react';

import styles from './UiSizeLayout.module.scss';

import { UiElementHeightType, UiElementWidthType } from '@/types/ui';

type Props = {
  className?: string;
  children: ReactNode;
  height?: UiElementHeightType;
  width?: UiElementWidthType;
};

export const UiSizeLayout: FC<Props> = ({ className, children, height = 'md', width = 'full' }) => {
  return (
    <div
      className={cn(
        styles.uiSizeLayout,
        {
          [styles[`uiSizeLayout_height_${height}`]]: height,
          [styles[`uiSizeLayout_width_${width}`]]: width,
        },
        className
      )}
    >
      {children}
    </div>
  );
};
