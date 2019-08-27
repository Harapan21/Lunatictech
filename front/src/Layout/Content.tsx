import * as React from 'react';

const Content: React.SFC<ContentProps> = ({ children, active, isLogin }) => {
  const choosen = children ? (
    isLogin ? (
      children[2]
    ) : (
      children[active]
    )
  ) : (
    <div>Error</div>
  );
  return <div style={{ height: '100%', width: '100%' }}>{choosen}</div>;
};

export default Content;
