import * as React from 'react';
import style from '../../public/style.scss';
import Logo from '../../public/Smile.svg';
const Sidebar: React.SFC<SidebarProps> = ({ menu, active, setActive }) => {
  return (
    <div className={style.sidebar}>
      <div className={style.logo}>
        <Logo width={20} />
      </div>
      <ul className={style.menu}>
        {menu.map(({ Icon, content }, idx) => {
          return (
            <li key={idx} onClick={() => setActive(idx)}>
              <Icon width={20} stroke={active === idx ? "2" : 1} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
