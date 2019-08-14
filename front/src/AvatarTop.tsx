import * as React from 'react';
import style from '../public/style.scss';

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

const Logout = () => (
  <button
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
