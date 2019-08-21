// tslint:disable-next-line:no-submodule-imports
import { all, put, takeLatest } from 'redux-saga/effects';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from '../apollo/query';
import {
  USER_FETCH_SUCCEEDED,
  USER_FETCH_REQUESTED,
  USER_FETCH_FAILED
} from './constan';

function* FetchUserData() {
  const { data, loading } = useQuery(GET_USER);
  // tslint:disable-next-line:curly
  if (!loading) {
    if (data.me) {
      yield put({
        type: USER_FETCH_SUCCEEDED,
        payload: { data, loading, isLogin: true }
      });
    } else {
      yield put({ type: USER_FETCH_FAILED, payload: { loading } });
    }
  }
}

function* GetUserData() {
  yield takeLatest(USER_FETCH_REQUESTED, FetchUserData);
}

export default function* rootSaga() {
  yield all([GetUserData()]);
}
