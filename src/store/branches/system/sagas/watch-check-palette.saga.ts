import { put, takeEvery } from 'redux-saga/effects';

import { systemActions, systemTypes } from '@/store/branches/system';

export function* checkPaletteWorker(action: ReturnType<typeof systemActions.setPalette>) {
  const palette = action.payload.palette;

  yield localStorage.setItem('palette', palette as string);
  yield document.getElementsByTagName('HTML')[0].setAttribute('data-palette', palette as string);
}

export function* setPaletteFromStorageWorker() {
  const palette = localStorage.getItem('palette') as systemTypes.PaletteTypesEnum;

  try {
    yield put(systemActions.setPalette({ palette }));
  } catch {}

  yield document.getElementsByTagName('HTML')[0].setAttribute('data-palette', palette as string);
}

export function* checkPaletteWatcher() {
  yield takeEvery(systemActions.restoreInitialAppState.type, setPaletteFromStorageWorker);
  yield takeEvery(systemActions.setPalette.type, checkPaletteWorker);
}
