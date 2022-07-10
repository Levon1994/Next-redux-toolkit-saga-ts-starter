import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { exampleActions } from '@/store/branches/example/example.slice';
import { modalActions, modalTypes } from '@/store/branches/modal';

import { getForecastReq } from '@/api/example';

export const OPEN_WEATHER_API_KEY = 'c54ed91ee62ba8bc1a4e4984a2f92188';
export const errorMessage = 'Could not load example forecast. Please, try again.';

export function* getForecastWorker(action: ReturnType<typeof exampleActions.getForecastExampleReq>) {
  const { lat, lon, modalFlowId } = action.payload;

  const appid = OPEN_WEATHER_API_KEY;

  try {
    const response: AxiosResponse<any> = yield call(getForecastReq, appid, lat, lon);

    yield put(exampleActions.getForecastExampleReq$success(response.data));
    yield put(modalActions.changeFlowModalType({ modalId: modalFlowId, modalType: modalTypes.ModalFlowEnum.SUCCESS }));
  } catch {
    yield put(modalActions.changeFlowModalType({ modalId: modalFlowId, modalType: modalTypes.ModalFlowEnum.FAILURE }));
  }
}

export function* getForecastWatcher() {
  yield takeEvery(exampleActions.getForecastExampleReq.type, getForecastWorker);
}
