import * as React from 'react';
import Sidebar from './Sidebar';
import style from '../../public/style.scss';
import Content from '../Layout/Content';
import Profile from './Profile';
import TextEditor from './textEditor';
const Dashboard = React.memo(({ user, handleLogin }: DashboardProps) => {
  const [active, setActive] = React.useState<DashboardState>(0);
  const handleSetActive = React.useCallback((payload: DashboardState) => {
    setActive(payload);
  }, []);
  return (
    <div className={`${style.dashboard} ${style.fadeIn}`}>
      <Sidebar
        user={user}
        active={active}
        setActive={handleSetActive}
        handleLogin={handleLogin}
      />
      <Content active={active}>
        <Profile user={user} />
        <TextEditor user={user} />
        <div>4</div>
      </Content>
    </div>
  );
});

export default Dashboard;
