import * as React from 'react';
import Avatar from '../components/Avatar';
import Alarm from '../../public/alarm.svg';
import Setting from '../../public/settings.svg';
const ProfileBar: React.SFC<ProfileProps> = ({ user, children }) => {
  return (
    <div
      style={{
        borderRight: '1px solid var(--grey)',

        color: 'var(--white)',
        width: 300,
        minWidth: 300,
        maxWidth: 300
      }}
    >
      <div style={{ background: 'var(--pink)' }}>
        <h1
          style={{
            fontWeight: 700,
            fontSize: 'var(--font-size-default)',
            padding: 15,
            margin: 0
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
          <Avatar user={user} round={true} size={40} />
          <span
            style={{
              marginLeft: 10,
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
const ProfileMenuBar = ({ menu }: { menu: ProfileMenu[] }) => {
  return (
    <ul
      style={{
        borderTop: '1px solid var(--grey)',
        borderBottom: '1px solid var(--grey)',
        margin: 0,
        width: '100%',
        padding: 0,
        display: 'inline-flex',
        listStyle: 'none'
      }}
    >
      {menu.map(({ svg: Svg }, index) => (
        <li key={index} style={{ padding: '5px 20px' }}>
          <Svg width={20} height={20} />
        </li>
      ))}
    </ul>
  );
};

const ProfileContent = () => {
  return <div style={{ width: '100%', height: '100%' }}>hai</div>;
};

export default function Profile({ user }: ProfileProps) {
  const [menu] = React.useState<ProfileMenu[]>([
    {
      svg: Alarm
    },
    {
      svg: Setting
    }
  ]);
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
        <ProfileMenuBar menu={menu} />
      </ProfileBar>
      <ProfileContent />
    </div>
  );
}
