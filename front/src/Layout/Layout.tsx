import * as React from 'react';
import style from '../../public/style.scss';

import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from '../apollo/query';
const Layout: React.SFC<LayoutProps> = ({ children }) => {
  const [state, setState] = React.useState<LayoutState>({
    isLogin: false,
    active: 0
  });

  const { active } = state;
  const Switcher = (active === 0 || 1) && (
    <button
      type="button"
      onClick={() =>
        setState((state: LayoutState) => ({
          ...state,
          active: state.active === 0 ? 1 : 0
        }))
      }
      style={{
        all: 'inherit',
        fontSize: 'var(--font-size-small)',
        fontWeight: 700,
        cursor: 'pointer',
        padding: 'var(--padding-small)',
        width: 'max-content'
      }}
    >
      {active === 0 ? 'Dont Have Account' : 'Have Account'}
    </button>
  );
  const { data,loading } = useQuery<UserData>(GET_USER);
  return (
    <div className={style.layout}>
      {children ? (
        children({
          ...state,
          handleLayoutState: (payload: any) => setState(payload),
          switcher: Switcher,
          user: {data, loading}
        })
      ) : (
        <div>Error</div>
      )}
    </div>
  );
};
export default Layout;
