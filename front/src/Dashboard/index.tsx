import * as React from 'react';
import Sidebar from './Sidebar';
import style from '../../public/style.scss';
import Dashboard from '../../public/dashboard.svg';
export default ({ user }: DashboardProps) => {
  const [active, setActive] = React.useState<DashboardState>(0);
  const menu = [{ icon: Dashboard, content: 'dashboard' }];
  return (
    <div className={style.dashboard}>
      <Sidebar
        menu={menu}
        active={active}
        setActive={(payload: DashboardState) => setActive(payload)}
      />
      Dashboard
    </div>
  );
};
