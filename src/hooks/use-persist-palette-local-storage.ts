import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { isServer } from '@/utils/is-server';

import { systemActions, systemSelectors, systemTypes } from '@/store/branches/system';

import { useConnectedAction } from './use-connected-action';

/**
 * Get hook-function to use for persist application palette
 * to local storage and set app palette to app state
 */
export const usePersistPaletteLocalStorage = (): void => {
  const clientSide = !isServer();

  const setPalette = useConnectedAction(systemActions.setPalette);
  const paletteFromStore = useSelector(systemSelectors.getPalette);

  const getInitialPalette = (): systemTypes.PaletteTypesEnum => {
    const isReturningUser = clientSide && 'palette' in localStorage;

    if (isReturningUser) {
      return localStorage.getItem('palette') as systemTypes.PaletteTypesEnum;
    } else {
      return paletteFromStore as systemTypes.PaletteTypesEnum;
    }
  };

  const palette = getInitialPalette();

  useEffect(() => {
    localStorage.setItem('palette', palette);

    document.getElementsByTagName('HTML')[0].setAttribute('data-palette', palette);

    setPalette({ palette });
  }, [setPalette, palette]);
};
