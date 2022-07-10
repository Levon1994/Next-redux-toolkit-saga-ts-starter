import { FC } from 'react';

import { RoutePathsEnum } from '@/configs/routes';

import { Link } from '@/components/general/Link';

import styles from './MainSidebar.module.scss';

export const MainSidebar: FC = () => {
  return (
    <nav className={styles.mainSidebar}>
      <ul>
        <li>
          <Link to={RoutePathsEnum.MAIN_DASHBOARD} id="main-sidebar-link-to-dashboard">
            Dashboard
          </Link>
        </li>
      </ul>
    </nav>
  );
};
