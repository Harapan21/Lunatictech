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
        {menu.map(({ Icon, content, isAvatar }, idx) => {
          return (
            <li
              key={idx}
              onClick={() => setActive(idx)}
              style={{ backgroundColor: active === idx ? 'var(--grey)' : ' ' }}
            >
              {!isAvatar ? <Icon /> : <Icon />}
              <span>{content}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
