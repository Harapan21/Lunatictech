import * as React from 'react';
import Dashboard from '../public/dashboard.svg';
import PaperPlane from '../public/paper-plane.svg';
import style from '../public/style.scss';
import { useApolloClient } from '@apollo/react-hooks';

enum Menu {
  Dahboard = 0,
  Post
}

export default function Sidebar() {
  const client = useApolloClient();
  const setMenu = (menu: Menu) => ({ data: { MenuToggle: menu } });
  client.writeData(setMenu(Menu.Dahboard));
  return (
    <div className={style.sidebar}>
      <ul className={style.menu}>
        <li
          onClick={() => client.writeData(setMenu(Menu.Dahboard))}
          style={{ cursor: 'pointer' }}
        >
          <Dashboard />
        </li>
        <li
          onClick={() => client.writeData(setMenu(Menu.Post))}
          style={{ cursor: 'pointer' }}
        >
          <PaperPlane />
        </li>
      </ul>
    </div>
  );
}
