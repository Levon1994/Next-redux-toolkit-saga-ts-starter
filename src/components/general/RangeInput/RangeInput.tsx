import cn from 'classnames';
import { FC, ReactElement } from 'react';

import { Input, Props as IInputProps } from '@/components/general/Input';

import styles from './RangeInput.module.scss';

type Props = {
  className?: string;
  from: (cb: (props: IInputProps) => JSX.Element) => ReactElement;
  to: (cb: (props: IInputProps) => JSX.Element) => ReactElement;
  id: string;
};

export const RangeInput: FC<Props> = ({ className, from, to, id }) => {
  return (
    <div className={cn(styles.rangeInput, className)} id={`range-input-${id}`}>
      <div>
        {from((props: IInputProps) => (
          <Input {...props} />
        ))}
      </div>

      <div>
        {to((props: IInputProps) => (
          <Input {...props} />
        ))}
      </div>
    </div>
  );
};
