import * as React from 'react';
import { Route } from 'react-router-dom';
import Setup from './setup';
import Dashboard from './dashboard';
import { useDispatch } from 'react-redux';
import { USER_FETCH_REQUESTED } from './redux/constan';

export default function AshaRouter() {
  const dispatch = useDispatch();
  dispatch({ type: USER_FETCH_REQUESTED });
  return (
    <>
      <Route exact={true} path="/setup" component={Setup} />
      <Route
        exact={true}
        path="/"
        render={({ history }: any) => {
          const token = localStorage.getItem('token');
          if (token) {
            return <Dashboard />;
          }
          history.push('/login');
          return;
        }}
      />
    </>
  );
}
