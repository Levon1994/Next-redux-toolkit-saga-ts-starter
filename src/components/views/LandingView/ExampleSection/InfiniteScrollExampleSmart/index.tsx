import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { InfiniteScroll } from '@/components/general/InfiniteScroll';

import { infiniteListSelector } from '@/store/branches/example/example.selectors';
import { exampleActions } from '@/store/branches/example/example.slice';

export const InfiniteScrollExampleSmart: FC = () => {
  const dispatch = useDispatch();

  const infiniteList = useSelector(infiniteListSelector);

  useEffect(() => {
    setTimeout(() => {
      dispatch(exampleActions.infiniteScrollExampleReq());
    }, 3000);
  }, [dispatch]);

  const handleScroll = (): void => {
    setTimeout(() => {
      dispatch(exampleActions.infiniteScrollExampleReq());
    }, 1500);
  };

  return <InfiniteScroll handleScroll={handleScroll} infiniteList={infiniteList} mainQuantity={24} />;
};
