import { fork } from 'redux-saga/effects';

import { accountBranchSaga } from './branches/account/sagas';
import { authBranchSaga } from './branches/auth/sagas';
import { exampleBranchSaga } from './branches/example/sagas';
import { systemBranchSaga } from './branches/system/sagas';
import { webSocketSaga } from './web-socket/sagas';

export function* rootSaga() {
  yield fork(accountBranchSaga);
  yield fork(exampleBranchSaga);
  yield fork(systemBranchSaga);
  yield fork(authBranchSaga);
  yield fork(webSocketSaga);
}
