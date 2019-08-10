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
  const data = (menu: Menu) => ({ data: { MenuToggle: menu } });
  client.writeData(data(Menu.Dahboard));

  return (
    <div className={style.sidebar}>
      <ul className={style.menu}>
        <li
          onClick={() => client.writeData(data(Menu.Dahboard))}
          style={{ cursor: 'pointer' }}
        >
          <Dashboard />
        </li>
        <li
          onClick={() => client.writeData(data(Menu.Post))}
          style={{ cursor: 'pointer' }}
        >
          <PaperPlane />
        </li>
      </ul>
    </div>
  );
}
