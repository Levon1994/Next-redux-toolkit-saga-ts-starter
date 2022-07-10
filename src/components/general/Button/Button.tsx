import { AnyAction } from '@reduxjs/toolkit';
import cn from 'classnames';
import noop from 'lodash/noop';
import { CSSProperties, FC, ReactChild, ReactNode } from 'react';

import { Loader } from '@/components/general/Loader';
import { Typography } from '@/components/general/Typography';
import { UiSizeLayout } from '@/components/layouts/UiSizeLayout';

import styles from './Button.module.scss';

import { UiElementHeightType, UiElementWidthType } from '@/types/ui';

type Props = {
  fontWeight?: 'default' | 'bold';
  uppercase?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void | AnyAction | undefined | string;
  children: ReactChild | ReactNode;
  variant?: 'contained' | 'outlined';
  loading?: boolean;
  height?: UiElementHeightType;
  width?: UiElementWidthType;
  color?: 'secondary';
  style?: CSSProperties;
  type?: 'button' | 'submit';
  id: string;
};

export const Button: FC<Props> = ({
  fontWeight = 'bold',
  uppercase,
  className,
  disabled,
  children,
  onClick,
  variant = 'contained',
  loading,
  height,
  width,
  style,
  color = 'secondary',
  type = 'button',
  id,
}) => {
  return (
    <UiSizeLayout width={width} height={height}>
      <button
        className={cn(
          styles.button,
          {
            [styles[`button_fontWeight_${fontWeight}`]]: fontWeight,
            [styles[`button_variant_${variant}`]]: variant,
            [styles[`button_padding_${height}`]]: height && width === 'content',
            [styles[`button_color_${color}`]]: color,
            [styles.button_disabled]: disabled,
            [styles.button_loading]: loading,
          },
          className
        )}
        disabled={disabled}
        onClick={loading || disabled ? noop : onClick}
        style={style}
        type={type}
        id={id}
      >
        {loading ? (
          <Loader color="onSecondary" />
        ) : (
          <div className={styles.button__content}>
            <Typography uppercase={uppercase} variant="inherit" color="inherit">
              {children}
            </Typography>
          </div>
        )}
      </button>
    </UiSizeLayout>
  );
};
