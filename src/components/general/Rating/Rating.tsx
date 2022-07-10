import cn from 'classnames';
import { FC } from 'react';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
import RatingComponent from 'react-rating';

import { ReactIcon } from '@/components/general/ReactIcon';

import styles from './Rating.module.scss';

type Props = {
  className?: string;
  onChange: (number: number) => void;
  value: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
  id: string;
};

export const Rating: FC<Props> = ({ className, onChange, value, size, id }) => {
  return (
    <div className={cn(styles.rating, className)} id={id}>
      {/* TODO: Delete @ts-ignore after lib will be updated */}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <RatingComponent
        initialRating={value}
        emptySymbol={
          <ReactIcon size={size}>
            <IoIosStarOutline />
          </ReactIcon>
        }
        fullSymbol={
          <ReactIcon>
            <IoIosStar size={size} />
          </ReactIcon>
        }
        onChange={onChange}
      />
    </div>
  );
};
