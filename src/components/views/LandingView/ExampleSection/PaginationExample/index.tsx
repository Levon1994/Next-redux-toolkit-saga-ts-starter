import { FC } from 'react';

import { Pagination, PaginationSelected } from '@/components/general/Pagination';

type Props = {
  changePageExample: (page: number) => void;
  page: number;
};

export const PaginationExample: FC<Props> = ({ changePageExample, page }) => {
  const changePageHandler = ({ selected }: PaginationSelected): void => changePageExample(selected);

  return (
    <div>
      <div>{page + 1}</div>

      <Pagination onPageChange={changePageHandler} initialPage={page} id="example-pagination" />
    </div>
  );
};
