import * as React from 'react';
import Sidebar from './Sidebar';
import style from '../../public/style.scss';

const Dashboard = ({ user }: DashboardProps) => {
  const [active, setActive] = React.useState<DashboardState>(1);
  const handleSetActive = React.useCallback((payload: DashboardState) => {
    setActive(payload);
  }, []);
  return (
    <div className={`${style.dashboard} ${style.fadeIn}`}>
      <Sidebar user={user} active={active} setActive={handleSetActive} />
      Dashboard
    </div>
  );
};

export default Dashboard;
