import cn from 'classnames';
import noop from 'lodash/noop';
import { FC, ReactNode, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { GiCeilingLight } from 'react-icons/gi';
import { TiArrowSortedDown } from 'react-icons/ti';
import { useSelector } from 'react-redux';

import { UiILocatorsEnum } from '@/configs/ui-locators';

import { Avatar } from '@/components/general/Avatar';
import { DropdownMenu } from '@/components/general/DropdownMenu';
import { ReactIcon } from '@/components/general/ReactIcon';
import { Switch } from '@/components/general/Switch';
import { Typography } from '@/components/general/Typography';

import { useConnectedAction } from '@/hooks/use-connected-action';

import { accountSelectors } from '@/store/branches/account';
import { authActions } from '@/store/branches/auth';
import { systemActions, systemSelectors, systemTypes } from '@/store/branches/system';

import styles from './AccountInfo.module.scss';

type Props = {
  className?: string;
  children?: ReactNode;
};

export const AccountInfo: FC<Props> = ({ className }) => {
  const [dropdownOpen, toggleDropdown] = useState<boolean>(false);

  const setPalette = useConnectedAction(systemActions.setPalette);
  const signOut = useConnectedAction(authActions.signOut);

  const palette = useSelector(systemSelectors.getPalette);
  const account = useSelector(accountSelectors.getAccount);

  const handlePaletteChange = (): void => {
    setPalette({
      palette:
        palette === systemTypes.PaletteTypesEnum.LIGHT
          ? systemTypes.PaletteTypesEnum.DARK
          : systemTypes.PaletteTypesEnum.LIGHT,
    });
  };

  const handleDropdownToggle = (value: boolean): void => {
    toggleDropdown(value);
  };

  return (
    <DropdownMenu
      onOutsideClick={handleDropdownToggle}
      className={className}
      button={
        <div className={styles.accountInfo} onClick={() => handleDropdownToggle(true)}>
          <Avatar id={UiILocatorsEnum.ACCOUNT_INFO_AVATAR} />

          <Typography className={styles.accountInfo__name} variant="body2" color="textDark" noWrap>
            {account.firstName}
          </Typography>

          <ReactIcon
            className={cn(styles.collapseIcon, {
              [styles.collapseIcon_open]: dropdownOpen,
            })}
            color="primaryDark"
            size="md"
          >
            <TiArrowSortedDown />
          </ReactIcon>
        </div>
      }
      open={dropdownOpen}
    >
      <div className={styles.accountInfo__menu}>
        <div
          className={styles.accountInfo__menuItem}
          onClick={handlePaletteChange}
          id="account-menu-palette-switch-item"
        >
          <ReactIcon size="lg" color="primaryDark">
            <GiCeilingLight />
          </ReactIcon>

          <Typography color="textDark">Dark mode</Typography>

          <Switch
            disabled
            onChange={noop}
            value={palette === systemTypes.PaletteTypesEnum.DARK ? true : false}
            name="darkModeSwitcher"
            size="sm"
            id={UiILocatorsEnum.ACCOUNT_INFO_DARK_MODE_SWITCHER}
          />
        </div>

        <div
          className={styles.accountInfo__menuItem}
          onClick={() => signOut()}
          id={UiILocatorsEnum.ACCOUNT_INFO_SIGN_OUT}
        >
          <ReactIcon size="lg" color="primaryDark">
            <FiLogOut />
          </ReactIcon>

          <Typography color="textDark">Log out</Typography>
        </div>
      </div>
    </DropdownMenu>
  );
};
