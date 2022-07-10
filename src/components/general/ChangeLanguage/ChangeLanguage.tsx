import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { FC } from 'react';

import styles from './ChangeLanguage.module.scss';
import i18nConfig from '../../../../i18n';

type Props = {
  linkTo?: string;
  id: string;
};

export const ChangeLanguage: FC<Props> = ({ linkTo = '/', id }) => {
  const { t, lang } = useTranslation('common');

  const { locales } = i18nConfig;

  return (
    <div className={styles.changeLanguage} id={id}>
      {locales.map((lng) => {
        if (lng === lang) return null;

        return (
          <Link href={linkTo} locale={lng} key={lng}>
            {t(`layout.language-name-${lng}`)}
          </Link>
        );
      })}
    </div>
  );
};
