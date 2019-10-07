import * as React from 'react';
import style from '../../public/style.scss';
import Logo from '../../public/Smile.svg';
import Plane from '../../public/paper-plane.svg';
import Upload from '../../public/server.svg';
import Avatar from '../components/Avatar';
import Logout from '../../public/logout.svg';
const Sidebar: React.SFC<SidebarProps> = React.memo(
  ({ user, active, setActive, handleLogin }) => {
    const [menu] = React.useState<SidebarState[]>([
      {
        id: 0,
        Icon: () => <Avatar user={user} />,
        content: user.data ? user.data.me.username : 'Guest'
      },
      { id: 1, Icon: Plane, content: 'Post' },
      { id: 2, Icon: Upload, content: 'Drive' }
    ]);
    const MapMenu = React.useCallback(
      () =>
        menu.map(({ Icon, content, id }) => {
          return (
            <li
              key={id}
              onClick={() => setActive(id)}
              className={active === id ? style.active : ''}
            >
              <Icon />
              <span>{content}</span>
            </li>
          );
        }),
      [active]
    );
    return (
      <div className={style.sidebar}>
        <div className={style.logo}>
          <Logo width={20} />
        </div>
        <ul className={style.menu}>
          {MapMenu()}
          <li
            onClick={() => handleLogin({ token: null, login: false })}
            style={{ color: 'var(--pink)' }}
          >
            <Logout />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    );
  }
);

export default Sidebar;
