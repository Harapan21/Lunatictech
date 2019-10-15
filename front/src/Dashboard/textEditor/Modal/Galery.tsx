import * as React from 'react';

import ImageSmile from '../../ImageSmile';
interface Galery {
  image: any;
  active: number | undefined;
  setActive: (idx: number) => void;
}

const Galery: React.SFC<Galery> = React.memo(({ image, active, setActive }) => (
  <div
    style={{
      display: 'flex',
      padding: '10px 15px',
      background: '#fff',
      margin: 0,
      borderTopLeftRadius: '20px',
      borderTopRightRadius: '20px'
    }}
  >
    {image.drive.map(({ location }: any, idx: number) => (
      <div
        key={idx}
        onClick={() => setActive(idx)}
        style={{
          cursor: 'pointer',
          boxSizing: 'border-box',
          opacity: active === idx ? 1 : 0.5,
          margin: '0px 5px',
          borderRadius: '15px',
          overflow: 'hidden'
        }}
      >
        <ImageSmile key={location} uri={location} height={80} />
      </div>
    ))}
  </div>
));

export default Galery;
