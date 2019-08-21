import * as React from 'react';
import style from '../public/style.scss';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { USER_LOGOOUT_EVENT } from './redux/constan';
export const AvatarTop: React.SFC<ReduxUserState> = ({ data, loading }) => {
  return loading ? (
    <Loading />
  ) : (
    <div className={style.name}>
      <Profile profileName={data.me.username} />
      <Logout />
    </div>
  );
};

const Loading = () => <div className={style.name}>Loading ...</div>;

const AnonymousAvatar = (letter: string) => <div>{letter}</div>;

const Profile = ({ profileName }: any) => (
  <button
    style={{
      all: 'unset',
      cursor: 'pointer',
      color: 'var(--blue)',
      fontSize: '.625rem',
      margin: '0px 10px'
    }}
  >
    {profileName}
  </button>
);

const Logout = withRouter(({ history }) => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        localStorage.removeItem('token');
        dispatch({ type: USER_LOGOOUT_EVENT });
        history.push('/login');
      }}
      style={{
        all: 'unset',
        cursor: 'pointer',
        color: 'var(--pink)',
        fontSize: '.425rem',
        margin: '0px 10px'
      }}
    >
      Logout
    </button>
  );
});
