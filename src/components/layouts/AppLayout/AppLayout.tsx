import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const AppLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};
