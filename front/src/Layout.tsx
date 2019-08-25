import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Smile from '../public/Smile.svg';
import style from '../public/style.scss';
import Sidebar from './sidebar';
import { AvatarTop } from './AvatarTop';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from './apollo/query';
import { connect } from 'react-redux';
import { USER_FETCH_SUCCEEDED, USER_FETCH_FAILED } from './redux/constan';
interface LayoutProps {
  user: ReduxUserState;
  storeToGlobal: (action, payload: any) => void;
  children: React.ReactNode;
}

function Layout({ children, user, storeToGlobal }: LayoutProps) {
  const { loading, data, refetch } = useQuery(GET_USER);
  React.useEffect(() => {
    refetch();
    if (!loading) {
      data.me
        ? storeToGlobal(USER_FETCH_SUCCEEDED, { data, loading, isLogin: true })
        : storeToGlobal(USER_FETCH_FAILED, { data, loading, isLogin: false });
    }
  }, [loading, data, refetch]);
  return (
    <Router>
      <div className={style.layout}>
        <div
          className={`${style.logo} ${
            user.isLogin ? style.avatar_section : ''
          }`}
        >
          {user.isLogin ? (
            <AvatarTop {...user} />
          ) : (
            <>
              <Smile />
              <span>smile</span>
            </>
          )}
        </div>
        <div className={style.content}>
          <Route exact={true} path="/" component={Sidebar} />
          <div className={style.children}>{children}</div>
        </div>
      </div>
    </Router>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch: any) => ({
  storeToGlobal: (action: any, payload: any) =>
    dispatch({ type: action, payload })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
