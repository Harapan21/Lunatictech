import * as React from 'react';
import style from '../public/style.scss';
import Dashboard from '../public/dashboard.svg';
import PaperPlane from '../public/paper-plane.svg';
export default function Sidebar() {
  return (
    <div className={style.sidebar}>
      <ul className={style.menu}>
        <li>
          <Dashboard />
        </li>
        <li>
          <PaperPlane />
        </li>
      </ul>
    </div>
  );
}
