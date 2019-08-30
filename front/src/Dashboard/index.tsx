import * as React from 'react';
import Sidebar from './Sidebar';
import style from '../../public/style.scss';
import Dashboard from '../../public/dashboard.svg';
import Plane from '../../public/paper-plane.svg';
import Upload from '../../public/server.svg';
import Avatar from '../components/Avatar';
export default ({ user }: DashboardProps) => {
  const [active, setActive] = React.useState<DashboardState>(1);
  const menu = [
    {
      Icon: () => <Avatar user={user} />,
      content: user.data ? user.data.me.username : 'Guest',
      isAvatar: true
    },
    { Icon: Dashboard, content: 'Dashboard' },
    { Icon: Plane, content: 'Post' },
    { Icon: Upload, content: 'Drive' }
  ];

  return (
    <div className={`${style.dashboard} ${style.fadeIn}`}>
      <Sidebar
        menu={menu}
        active={active}
        setActive={(payload: DashboardState) => setActive(payload)}
      />
      Dashboard
    </div>
  );
};
