import * as React from 'react';
import style from '../../public/style.scss';
import Avatar from '../components/Avatar';
import Alarm from '../../public/alarm.svg';
import Setting from '../../public/settings.svg';
const ProfileBar: React.SFC<ProfileProps> = ({ user, children }) => {
  return (
    <div
      style={{
        borderRight: '1px solid var(--grey)',

        color: 'var(--white)',
        width: '300px'
      }}
    >
      <div style={{ background: 'var(--pink)' }}>
        <h1
          style={{
            fontWeight: 700,
            fontSize: 'var(--font-size-default)',
            padding: '20px'
          }}
        >
          Profile
        </h1>
        <div
          style={{
            display: 'flex',
            justifyItems: 'center',
            padding: '10px'
          }}
        >
          <Avatar user={user} round={true} size={50} />
          <span
            style={{
              marginLeft: 5,
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <h3
              style={{
                fontSize: 'var(--font-size-default)',
                padding: 0,
                margin: 0
              }}
            >
              {user.data.me.fullname}
            </h3>
            <h4
              style={{
                fontSize: 'var(--font-size-medium)',
                padding: 0,
                margin: 0
              }}
            >
              @{user.data.me.username}
            </h4>
          </span>
        </div>
      </div>
      {children}
    </div>
  );
};
const ProfileMenuBar = () => {
  return (
    <ul
      style={{
        borderTop: '1px solid var(--grey)',
        borderBottom: '1px solid var(--grey)',
        margin: 0,
        height: 50
      }}
    >
      <li>
        <Alarm width={30} height={30} />
      </li>
      <li>
        <Setting width={30} height={30} />
      </li>
    </ul>
  );
};
export default function Profile({ user }: ProfileProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        width: '100%'
      }}
    >
      <ProfileBar user={user}>
        <ProfileMenuBar />
      </ProfileBar>
    </div>
  );
}
