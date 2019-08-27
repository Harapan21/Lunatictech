import * as React from 'react';

const Content: React.SFC<ContentProps> = ({ children, active }) => {
  const choosen = children[active] ? children[active] : <div>Error</div>;
  return <div style={{ height: '100%', width: '100%' }}>{choosen}</div>;
};

export default React.memo(Content);
