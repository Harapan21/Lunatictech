import * as React from 'react';
import style from '../../public/style.scss';

const Avatar: React.SFC<AvatarProps> = ({ user: { data, loading } }) => {
  return <div className={style.Avatar}>{data && data.me.firstLetter}</div>;
};

export default Avatar;
