import * as React from 'react';
import style from '../../public/style.scss';
import Logo from '../../public/Smile.svg';
const Sidebar: React.SFC<SidebarProps> = ({ menu }) => {
  return (
    <div className={style.sidebar}>
      <div className={style.logo}>
        <Logo width={20} />
      </div>
    </div>
  );
};

export default Sidebar;
