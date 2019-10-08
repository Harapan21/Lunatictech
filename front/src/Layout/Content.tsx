import * as React from 'react';

const Content: React.SFC<ContentProps> = React.memo(
  ({ children, active, isLogin, defaultActive }) => {
    const Choosen = React.useCallback(
      () =>
        children ? (
          isLogin && defaultActive ? (
            children[defaultActive]
          ) : (
            children[active]
          )
        ) : (
          <div>Error</div>
        ),
      [active, isLogin, defaultActive]
    );
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <Choosen />
      </div>
    );
  }
);

export default Content;
