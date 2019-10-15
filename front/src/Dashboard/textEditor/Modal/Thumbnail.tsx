import * as React from 'react';
import Galery from './Galery';

import ImageSmile from '../../ImageSmile';
interface ThumbnailProps {
  image: any;
}

const Thumbnail: React.SFC<ThumbnailProps> = React.memo(({ image }) => {
  const [active, setActive] = React.useState<number>();
  const HandleActive = React.useCallback(
    (idx: number) => {
      setActive(idx);
    },
    [active, setActive]
  );
  const isLocation =
    active && image.drive[active] && image.drive[active].location;

  const location = isLocation ? (
    <ImageSmile uri={isLocation} width="max-content" height="100%" />
  ) : (
    ' Select Image'
  );
  console.log(isLocation);
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div
        style={{
          width: '100%',
          maxHeight: '100%',
          overflow: 'hidden',
          flex: 1,
          position: 'relative'
        }}
      >
        <span
          style={{
            position: 'absolute',
            display: !active ? 'flex' : 'block',
            justifyContent: !active ? 'center' : ' ',
            alignItems: !active ? 'center' : '',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            margin: 'auto'
          }}
        >
          {location}
        </span>
      </div>
      <Galery active={active} setActive={HandleActive} image={image} />
    </div>
  );
});

export default Thumbnail;
