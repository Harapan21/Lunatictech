import * as React from 'react';
import style from '../../public/style.scss';
import Logo from '../../public/Smile.svg';
import DashboardSVG from '../../public/dashboard.svg';
import Plane from '../../public/paper-plane.svg';
import Upload from '../../public/server.svg';
import Avatar from '../components/Avatar';

const Sidebar: React.SFC<SidebarProps> = React.memo(
  ({ user, active, setActive }) => {
    const [menu] = React.useState([
      {
        id: 0,
        Icon: () => <Avatar user={user} />,
        content: user.data ? user.data.me.username : 'Guest',
        isAvatar: true
      },
      { id: 1, Icon: DashboardSVG, content: 'Dashboard' },
      { id: 2, Icon: Plane, content: 'Post' },
      { id: 3, Icon: Upload, content: 'Drive' }
    ]);
    const MapMenu = React.useCallback(
      () =>
        menu.map(({ Icon, content, id }) => {
          return (
            <li
              key={id}
              onClick={() => setActive(id)}
              style={{ backgroundColor: active === id ? 'var(--grey)' : ' ' }}
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
        </ul>
      </div>
    );
  }
);

export default Sidebar;
