import cn from 'classnames';
import { FC, ReactNode } from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';

import { UiILocatorsEnum } from '@/configs/ui-locators';

import styles from './DropdownMenu.module.scss';

type Props = {
  onOutsideClick: (value: boolean) => void;
  className?: string;
  children: ReactNode;
  button: ReactNode;
  open: boolean;
};

export const DropdownMenu: FC<Props> = ({ onOutsideClick, className, children, button, open }) => {
  const ref = useOnclickOutside(() => onOutsideClick(false));

  return (
    <div
      className={cn(
        styles.dropdownMenu,
        {
          [styles.dropdownMenu_open]: open,
        },
        className
      )}
    >
      <div className={styles.dropdownMenu__buttonWrapper}>{button}</div>

      {open && (
        <div className={styles.dropdownMenu__list} id={UiILocatorsEnum.DROPDOWN_MENU_LIST} ref={ref}>
          {children}
        </div>
      )}
    </div>
  );
};
