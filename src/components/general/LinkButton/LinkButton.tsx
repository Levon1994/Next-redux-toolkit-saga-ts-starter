import cn from 'classnames';
import Link from 'next/link';
import { CSSProperties, FC, ReactNode } from 'react';

import { Typography } from '@/components/general/Typography';
import { UiSizeLayout } from '@/components/layouts/UiSizeLayout';

import styles from './LinkButton.module.scss';

import { UiElementHeightType, UiElementWidthType } from '@/types/ui';

type Props = {
  fontWeight?: 'default' | 'bold';
  uppercase?: boolean;
  className?: string;
  children: ReactNode | string | number;
  variant?: 'contained' | 'outlined';
  height?: UiElementHeightType;
  width?: UiElementWidthType;
  color?: 'secondary';
  style?: CSSProperties;
  to: string;
  id: string;
};

export const LinkButton: FC<Props> = ({
  fontWeight = 'bold',
  uppercase,
  className,
  children,
  variant = 'contained',
  height,
  width,
  style,
  color = 'secondary',
  to,
  id,
}) => {
  return (
    <UiSizeLayout width={width} height={height}>
      <Link href={to}>
        <a
          className={cn(
            styles.linkButton,
            {
              [styles[`linkButton_fontWeight_${fontWeight}`]]: fontWeight,
              [styles[`linkButton_variant_${variant}`]]: variant,
              [styles[`linkButton_padding_${height}`]]: height && width === 'content',
              [styles[`linkButton_color_${color}`]]: color,
            },
            className
          )}
          style={style}
          id={id}
        >
          <Typography uppercase={uppercase} color="inherit" variant="inherit">
            {children}
          </Typography>
        </a>
      </Link>
    </UiSizeLayout>
  );
};
