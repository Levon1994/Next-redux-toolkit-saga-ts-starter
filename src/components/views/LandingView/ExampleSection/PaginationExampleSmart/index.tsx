import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { paginationExamplePageSelector } from '@/store/branches/example/example.selectors';
import { exampleActions } from '@/store/branches/example/example.slice';

import { PaginationExample } from '../PaginationExample';

export const PaginationExampleSmart: FC = () => {
  const dispatch = useDispatch();

  const page = useSelector(paginationExamplePageSelector);

  const changePageExample = (page: number): void => {
    dispatch(exampleActions.changePageExample({ page }));
  };

  return <PaginationExample changePageExample={changePageExample} page={page} />;
};
