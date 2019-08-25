import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Setup from './setup';
import LoginResult from './dashboard/LoginResult';
import Dashboard from './dashboard';
import { connect } from 'react-redux';

interface AshaRouterProps {
  user: ReduxUserState;
}

const HandleRoute = ({ user }: any) => {
  if (user.loading) {
    return <div>Loading...</div>;
  }
  if (user.data.me) {
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
  // tslint:disable-next-line:semicolon
};

function AshaRouter({ user }: AshaRouterProps) {
  return (
    <>
      <Route exact={true} path="/setup" component={Setup} />
      <Route exact={true} path="/login" component={LoginResult} />
      <Route exact={true} path="/" render={() => <HandleRoute user={user} />} />
    </>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(mapStateToProps)(AshaRouter);
