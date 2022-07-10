import cn from 'classnames';
import { FC, ReactElement } from 'react';

import { DatePicker, Props as IDatePickerProps } from '@/components/general/DatePicker';

import styles from './DatePeriod.module.scss';

type Props = {
  className?: string;
  dateFrom: (cb: (props: IDatePickerProps) => JSX.Element) => ReactElement;
  dateTo: (cb: (props: IDatePickerProps) => JSX.Element) => ReactElement;
  id: string;
};

export const DatePeriod: FC<Props> = ({ className, dateFrom, dateTo, id }) => {
  return (
    <div className={cn(styles.datePeriod, className)} id={`date-period-${id}`}>
      <div>
        {dateFrom((props: IDatePickerProps) => (
          <DatePicker {...props} />
        ))}
      </div>

      <div>
        {dateTo((props: IDatePickerProps) => (
          <DatePicker {...props} />
        ))}
      </div>
    </div>
  );
};
