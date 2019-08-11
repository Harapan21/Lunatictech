import * as React from 'react';
import Dashboard from '../public/dashboard.svg';
import PaperPlane from '../public/paper-plane.svg';
import style from '../public/style.scss';
import { useSelector, useDispatch } from 'react-redux';
import { DASHBOARD_MENU } from './redux/constan';

enum Menu {
  Dahboard = 0,
  Post
}

function SidebarM() {
  const IS_POST_TOGGLE = useSelector(({ menu }: any) => menu.toggle);
  const dispatch = useDispatch();
  return (
    <div
      className={style.sidebar}
      style={{
        zIndex: IS_POST_TOGGLE ? 0 : 3
      }}
    >
      <ul className={style.menu}>
        <li
          onClick={() =>
            dispatch({ type: DASHBOARD_MENU, payload: Menu.Dahboard })
          }
          style={{ cursor: 'pointer' }}
        >
          <Dashboard />
        </li>
        <li
          onClick={() => dispatch({ type: DASHBOARD_MENU, payload: Menu.Post })}
          style={{ cursor: 'pointer' }}
        >
          <PaperPlane />
        </li>
      </ul>
    </div>
  );
}

const Sidebar = React.memo(SidebarM);

export default Sidebar;
