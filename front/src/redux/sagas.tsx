// tslint:disable-next-line:no-submodule-imports
import { all, put, takeEvery } from 'redux-saga/effects';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from '../apollo/query';
import { USER_FETCH_SUCCEEDED, USER_FETCH_REQUESTED } from './constan';

function* FetchUserData() {
  const { data, loading } = useQuery(GET_USER);
  yield put({ type: USER_FETCH_SUCCEEDED, payload: { data, loading } });
}

function* GetUserData() {
  yield takeEvery(USER_FETCH_REQUESTED, FetchUserData);
}

export default function* rootSaga() {
  yield all([GetUserData()]);
}
