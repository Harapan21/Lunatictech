// tslint:disable-next-line:no-submodule-imports
import { all, put, takeLatest, call } from 'redux-saga/effects';
import { getUser } from '../apollo/actionMutation';
import {
  USER_FETCH_SUCCEEDED,
  USER_FETCH_REQUESTED,
  USER_FETCH_FAILED
} from './constan';

function* FetchUserData() {
  try {
    const user = yield call(getUser);
    yield console.log(user);
    yield put({
      type: USER_FETCH_SUCCEEDED,
      payload: { data, loading, isLogin: true }
    });
  } catch {
    yield put({ type: USER_FETCH_FAILED, payload: { loading: false } });
  }
}

function* GetUserData() {
  yield takeLatest(USER_FETCH_REQUESTED, FetchUserData);
}

export default function* rootSaga() {
  yield all([GetUserData()]);
}
