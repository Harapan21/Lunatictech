import * as React from 'react';
import style from '../../public/style.scss';

import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from '../apollo/query';
import Loading from '../components/Loading';
const Layout: React.SFC<LayoutProps> = ({ children }) => {
  const { data, loading } = useQuery<UserData>(GET_USER);
  const [state, setState] = React.useState<LayoutState>({
    isLogin: false,
    active: 0
  });
  React.useEffect(() => {
    if (!loading) {
      if (data && data.me) {
        setState((state: LayoutState) => ({
          ...state,
          isLogin: true
        }));
      }
    }
  }, [data, loading]);
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

  return (
    <div className={`${style.layout} ${state.isLogin ? style.logged : ''}`}>
      {loading ? (
        <div
          className={style.flexCenter}
          style={{ height: '100%', width: '100%' }}
        >
          <Loading />
        </div>
      ) : children ? (
        children({
          ...state,
          handleLayoutState: (payload: any) => setState(payload),
          switcher: Switcher,
          user: { data, loading }
        })
      ) : (
        <div>Error</div>
      )}
    </div>
  );
};
export default Layout;
