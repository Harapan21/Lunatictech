// import * as React from 'react';
import { all, put, takeLatest, call } from 'redux-saga/effects';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from '../apollo/query';
import { USER_FETCH_SUCCEEDED, USER_FETCH_REQUESTED } from './constan';

function* FetchUserData() {
  const { data } = useQuery(GET_USER);
  yield put({ type: USER_FETCH_SUCCEEDED, payload: data });
}

function* GetUserData() {
  yield takeLatest(USER_FETCH_REQUESTED, FetchUserData);
}

export default function* rootSaga() {
  yield all([GetUserData()]);
}
