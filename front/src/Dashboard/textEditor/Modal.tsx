import * as React from 'react';
import ImageSmile from '../ImageSmile';

const Modal = React.memo<ModalProps>(({ setToggle, user }) => {
  const [active, setActive] = React.useState<number | null>(null);
  const [image] = React.useState(user.data.me);
  const [menuModal, setActiveMenuModal] = React.useState({
    menu: [{ menu: 'Galery' }, { menu: 'Link' }],
    active: 0
  });
  const handleImageActive = React.useCallback((active: number) => {
    setActive(active);
  }, []);
  const handleMenuModal = React.useCallback((active: number) => {
    setActiveMenuModal((state: any) => ({ ...state, active }));
  }, []);

  const MapImage = React.useCallback(
    () =>
      image.drive.map(({ location }, idx) => (
        <div
          key={location}
          onClick={() => handleImageActive(idx)}
          style={{
            cursor: 'pointer',
            boxSizing: 'border-box',
            opacity: active === idx ? 1 : 0.5
          }}
        >
          <ImageSmile key={location} uri={location} width={100} />
        </div>
      )),
    []
  );

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
        background: 'rgba(255, 255, 255, 0.6)'
      }}
    >
      <div
        style={{
          background: 'var(--white)',
          width: '90%',
          height: '70%',
          boxShadow: 'var(--shadow-2-xl)',
          border: '1px solid (--grey)',
          borderRadius: 10,
          position: 'relative'
        }}
      >
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
            x
          </button>
        </div>
        <div style={{ display: 'flex', padding: '0px 20px', marginBottom: 10 }}>
          {menuModal.menu.map(({ menu }, idx) => (
            <span
              key={menu}
              style={{
                fontWeight: menuModal.active === idx ? 700 : 500,
                fontSize: 'var(--font-size-default)',
                marginRight: '15px',
                cursor: 'pointer'
              }}
              onClick={() => handleMenuModal(idx)}
            >
              {menu}
            </span>
          ))}
        </div>
        {menuModal.active === 0 && (
          <div
            style={{ display: 'flex', flexWrap: 'wrap', padding: '0px 20px' }}
          >
            {MapImage}
          </div>
        )}
      </div>
    </div>
  );
});

export default Modal;
