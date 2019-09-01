import * as React from 'react';
import style from '../../public/style.scss';

export default function Profile({
  user: {
    data: { me }
  }
}: ProfileProps) {
  const { fullname, avatar, username, firstLetter } = me;
  return (
    <>
      <div className={style.title}>Profile</div>
      <div
        style={{
          fontSize: 'var(--font-size-default)',
          textTransform: 'capitalize',
          padding: '5px 10px',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid var(--grey)'
        }}
      >
        {avatar ? (
          <img
            src={avatar}
            width={50}
            style={{ marginRight: 10, borderRadius: '50%' }}
          />
        ) : (
          <div
            style={{
              width: 50,
              height: 50,
              display: 'flex',
              alignItems: 'center',
              borderRadius: '50%',
              margin: '0px 10px',
              color: 'var(--white)',
              justifyContent: 'center',
              background: 'var(--blue)'
            }}
          >
            {firstLetter}
          </div>
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <span>{fullname}</span>
          <span
            style={{
              fontSize: 'var(--font-size-small)',
              opacity: 0.6,
              fontWeight: 700
            }}
          >
            @ {username}
          </span>
        </div>
      </div>
    </>
  );
}
