import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Setup from './setup';
import LoginResult from './dashboard/LoginResult';
import Dashboard from './dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { USER_FETCH_REQUESTED } from './redux/constan';

const HandleRoute = () => {
  const user: ReduxUserState = useSelector((state: any) => state.user);
  if (user.loading) {
    return <div>Loading...</div>;
  } else {
    return user.isLogin ? (
      <Dashboard />
    ) : (
      <Redirect
        to={{
          pathname: '/login'
        }}
      />
    );
  }
};

export default function AshaRouter() {
  const dispatch = useDispatch();
  dispatch({ type: USER_FETCH_REQUESTED });
  return (
    <>
      <Route exact={true} path="/setup" component={Setup} />
      <Route exact={true} path="/login" component={LoginResult} />
      <Route exact={true} path="/" component={HandleRoute} />
    </>
  );
}
