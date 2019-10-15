import * as React from 'react';
import Thumbnail from './Modal/Thumbnail';
const Modal = React.memo<ModalProps>(({ setToggle, user }) => {
  const [menuModal, setMenuModal] = React.useState({
    menu: [{ title: 'Thumbnail' }],
    active: 0
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.6)',
        zIndex: 4
      }}
    >
      <div
        style={{
          background: 'var(--white)',
          width: '95%',
          height: '90%',
          boxShadow: 'var(--shadow-2-xl)',
          border: '1px solid (--grey)',
          borderRadius: 10,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <Thumbnail image={user.data.me} />
        <div
          style={{
            fontSize: 'var(--font-size-default)',
            padding: '10px 20px',
            fontWeight: 700,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>Thumbnail</span>
          <button
            type="button"
            style={{
              all: 'unset',
              cursor: 'pointer',
              fontSize: 'var(--font-size-default)'
            }}
            onClick={setToggle}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
});

export default Modal;
