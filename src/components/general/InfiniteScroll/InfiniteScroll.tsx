import cn from 'classnames';
import { FC } from 'react';
import InfiniteScrollComponent from 'react-infinite-scroll-component';

import { Loader } from '@/components/general/Loader';

import { IInfiniteListItem } from '@/store/branches/example/example.types';

import styles from './InfiniteScroll.module.scss';

type Props = {
  // TODO: Add logic to put custom listItem type
  infiniteList: IInfiniteListItem[];
  handleScroll: () => void;
  mainQuantity: number;
  className?: string;
};

export const InfiniteScroll: FC<Props> = ({ handleScroll, mainQuantity, className, infiniteList }) => {
  return (
    <div id="scrollableDiv" className={cn(styles.infiniteContainer, className)}>
      <InfiniteScrollComponent
        scrollableTarget="scrollableDiv"
        dataLength={infiniteList.length}
        className={styles.infiniteContainer__wrapper}
        hasMore={infiniteList.length < mainQuantity}
        loader={
          <div className={styles.infiniteContainer__loader}>
            <Loader size="sm" />
          </div>
        }
        next={handleScroll}
      >
        {infiniteList.map((object: Record<string, any>, index: number) => (
          <div className={styles.infiniteContainer__item} key={index}>
            {/* TODO: Add render custom listItem type */}
            {object.title} - #{index}
          </div>
        ))}
      </InfiniteScrollComponent>
      {/* TODO: Add button "Load more" logic */}
    </div>
  );
};
