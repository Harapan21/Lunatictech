import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Smile from '../public/Smile.svg';
import style from '../public/style.scss';
import Sidebar from './sidebar';

export default function Layout(props) {
  return (
    <Router>
      <div className={style.layout}>
        <div className={style.logo}>
          <Smile />
          <span>smile</span>
        </div>
        <div className={style.content}>
          <Route exact={true} path="/" component={Sidebar} />
          <div className={style.children}>{props.children}</div>
        </div>
      </div>
    </Router>
  );
}
