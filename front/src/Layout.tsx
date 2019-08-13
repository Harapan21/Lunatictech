import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Smile from '../public/Smile.svg';
import style from '../public/style.scss';
import Sidebar from './sidebar';

import Avatar from './AvatarTop';
import { useSelector } from 'react-redux';
// redux

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout(props: LayoutProps) {
  const { user } = useSelector((state: any) => state.user);
  return (
    <Router>
      <div className={style.layout}>
        {user.isLogin ? (
          <Avatar user={user} />
        ) : (
          <div className={style.logo}>
            <Smile />
            <span>smile</span>
          </div>
        )}
        <div className={style.content}>
          <Route exact={true} path="/" component={Sidebar} />
          <div className={style.children}>{props.children}</div>
        </div>
      </div>
    </Router>
  );
}
