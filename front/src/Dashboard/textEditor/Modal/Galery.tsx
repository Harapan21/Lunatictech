import * as React from 'react';
import style from '../../../../public/style.scss';
import ImageSmile from '../../ImageSmile';
interface Galery {
  image: any;
  active: number | undefined;
  setActive: (idx: number) => void;
}

const Galery: React.SFC<Galery> = React.memo(({ image, active, setActive }) => (
  <div
    className={style.styleScroolbar}
    style={{
      display: 'flex',
      padding: '10px 15px',
      background: '#fff',
      margin: 0,
      borderTopLeftRadius: '20px',
      borderTopRightRadius: '20px',
      overflowX: 'scroll'
    }}
  >
    {image.drive.map(({ location }: any, idx: number) => (
      <span
        key={idx}
        onClick={() => setActive(idx)}
        style={{
          cursor: 'pointer',
          boxSizing: 'border-box',
          opacity: active === idx ? 1 : 0.5,
          margin: '0px 5px',
          borderRadius: '15px',
          overflow: 'hidden',
          minWidth: 'min-content'
        }}
      >
        <ImageSmile
          key={location}
          uri={location}
          height={70}
          width="max-content"
        />
      </span>
    ))}
  </div>
));

export default Galery;
