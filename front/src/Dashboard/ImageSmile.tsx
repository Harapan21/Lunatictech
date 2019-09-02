import * as React from 'react';
import Loading from '../components/Loading';

const ImageSmile = React.memo<ImageProps>(({ uri, height }) => {
  const [isLoad, setLoad] = React.useState(false);
  React.useEffect(() => {
    if (!isLoad) {
      const imageTemp = new Image();
      imageTemp.src = uri;
      imageTemp.onload = () => {
        setLoad(true);
      };
    }
  }, [isLoad]);
  return (
    <div
      style={{
        width: isLoad ? 'auto' : height,
        height,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {isLoad ? <img src={uri} height={height} /> : <Loading width={20} />}
    </div>
  );
});

export default ImageSmile;
