import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Setup from './setup';
import LoginResult from './dashboard/LoginResult';
import Dashboard from './dashboard';
import { connect } from 'react-redux';
import { USER_FETCH_REQUESTED } from './redux/constan';

interface AshaRouterProps {
  user: ReduxUserState;
  fetchUser: any;
}

class AshaRouter extends React.Component<AshaRouterProps> {
  public componentDidMount() {
    this.props.fetchUser();
  }
  public HandleRoute = () => {
    const { isLogin, loading } = this.props.user;
    if (loading) {
      return <div>Loading...</div>;
    } else {
      return isLogin ? (
        <Dashboard />
      ) : (
        <Redirect
          to={{
            pathname: '/login'
          }}
        />
      );
    }
    // tslint:disable-next-line:semicolon
  };

  public render() {
    return (
      <>
        <Route exact={true} path="/setup" component={Setup} />
        <Route exact={true} path="/login" render={() => <LoginResult />} />
        <Route exact={true} path="/" component={this.HandleRoute} />
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchUser: () => dispatch({ type: USER_FETCH_REQUESTED })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AshaRouter);
