import * as React from 'react';
import Sidebar from './Sidebar';
import style from '../../public/style.scss';
import Content from '../Layout/Content';
import Profile from './Profile';
import TextEditor from './textEditor';

const Dashboard = ({ user }: DashboardProps) => {
  const [active, setActive] = React.useState<DashboardState>(0);
  const handleSetActive = React.useCallback((payload: DashboardState) => {
    setActive(payload);
  }, []);
  return (
    <div className={`${style.dashboard} ${style.fadeIn}`}>
      <Sidebar user={user} active={active} setActive={handleSetActive} />
      <Content active={active}>
        <Profile user={user} />
        <div>3</div>
        <TextEditor user={user}/>
        <div>4</div>
      </Content>
    </div>
  );
};

export default Dashboard;
