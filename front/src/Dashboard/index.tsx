import * as React from 'react';
import Sidebar from './Sidebar';
import style from '../../public/style.scss';
import Dashboard from '../../public/dashboard.svg';
import Plane from '../../public/paper-plane.svg';
import Upload from '../../public/server.svg';
export default ({ user }: DashboardProps) => {
  const [active, setActive] = React.useState<DashboardState>(0);
  const menu = [
    { Icon: Dashboard, content: 'dashboard' },
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
