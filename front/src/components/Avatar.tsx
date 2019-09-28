import * as React from 'react';
import style from '../../public/style.scss';

const Avatar: React.SFC<AvatarProps> = React.memo(
  ({ user: { data }, round, size }) => {
    const [avatar] = React.useState(data);
    const isAvatar = avatar.me.avatar;
    return (
      <div
        style={{ width: size ? size : '', height: size ? size : '' }}
        className={`${style.Avatar} ${isAvatar && style.valid}`}
      >
        {isAvatar ? (
          <img
            style={{
              borderRadius: round ? '50%' : '',
              width: size ? size : '',
              height: size ? size : ''
            }}
            src={isAvatar}
          />
        ) : (
          data.me.firstLetter
        )}
      </div>
    );
  }
);

export default Avatar;
