import * as React from 'react';
import Loading from '../components/Loading';

const ImageSmile: React.SFC<ImageProps> = React.memo(({ uri, width }) => {
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
  console.log(isLoad);
  return (
    <div
      style={{
        width,
        height: width,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {isLoad ? <img src={uri} width={width} /> : <Loading width={20} />}
    </div>
  );
});

export default ImageSmile;
