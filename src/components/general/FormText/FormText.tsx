import cn from 'classnames';
import { FC, ReactNode } from 'react';

import { Typography } from '@/components/general/Typography';

type Props = {
  className?: string;
  type?: 'simple' | 'title' | 'subtitle' | 'error';
  text: ReactNode | string;
};

export const FormText: FC<Props> = ({ className, type, text }) => {
  switch (type) {
    case 'title':
      return (
        <Typography className={cn(className)} variant="h1">
          {text}
        </Typography>
      );

    case 'subtitle':
      return (
        <Typography className={cn(className)} variant="body1">
          {text}
        </Typography>
      );

    case 'error':
      return (
        <Typography className={cn(className)} variant="body2" color="error">
          {text}
        </Typography>
      );

    case 'simple':
    default:
      return (
        <Typography className={cn(className)} variant="body2">
          {text}
        </Typography>
      );
  }
};
