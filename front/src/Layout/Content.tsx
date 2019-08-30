import * as React from 'react';

const Content: React.SFC<ContentProps> = ({
  children,
  active,
  isLogin,
  defaultActive
}) => {
  const choosen = children ? (
    isLogin && defaultActive ? (
      children[defaultActive]
    ) : (
      children[active]
    )
  ) : (
    <div>Error</div>
  );
  return <div style={{ height: '100%', width: '100%' }}>{choosen}</div>;
};

export default Content;
