import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
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
        render={() => {
          const token = localStorage.getItem('token');
          if (token) {
            return <Dashboard />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: '/login'
                }}
              />
            );
          }
        }}
      />
    </>
  );
}
