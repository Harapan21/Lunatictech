import * as React from 'react';
import style from '../../public/style.scss';

const Avatar: React.SFC<AvatarProps> = React.memo(({ user: { data } }) => {
  const [avatar] = React.useState(data);
  const isAvatar = avatar.me.avatar;
  return (
    <div className={`${style.Avatar} ${isAvatar && style.valid}`}>
      {isAvatar ? <img src={isAvatar} /> : data.me.firstLetter}
    </div>
  );
});

export default Avatar;
