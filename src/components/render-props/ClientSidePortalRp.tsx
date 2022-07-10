import { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: ReactNode;
};

export const ClientSidePortalRp: FC<Props> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? createPortal(children, document.body) : null;
};
