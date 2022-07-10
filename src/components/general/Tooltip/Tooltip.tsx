import cn from 'classnames';
import { FC, ReactNode } from 'react';
import { Position, Tooltip as TippyTooltip, TooltipProps } from 'react-tippy';

import styles from './styles.module.scss';

type Props = {
  customOptions?: Partial<TooltipProps>;
  simpleTitle: string;
  className?: string;
  children: ReactNode;
};

export const Tooltip: FC<Props> = ({ customOptions, simpleTitle, className, children }) => {
  const options = {
    position: 'bottom' as Position,
    title: simpleTitle,
    ...customOptions,
  };

  return (
    // TODO: Delete @ts-ignore after lib will be updated
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <TippyTooltip className={cn(styles.tooltip, className)} trigger="click" {...options}>
      {children}
    </TippyTooltip>
  );
};
