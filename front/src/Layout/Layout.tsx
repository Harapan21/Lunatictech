import * as React from 'react';
import style from '../../public/style.scss';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from '../apollo/query';
import Loading from '../components/Loading';

const Layout: React.SFC<LayoutProps> = React.memo(({ children }) => {
  const getUser = useQuery<{ me: UserData }>(GET_USER);
  const user = React.useCallback(() => getUser, [getUser]);
  const { data, loading } = user();
  const [state, setState] = React.useState<LayoutState>({
    isLogin: false,
    active: 0
  });
  const handleLogin = React.useCallback(() => {
    setState((state: LayoutState) => ({
      ...state,
      isLogin: true
    }));
  }, []);
  React.useEffect(() => {
    if (!loading) {
      if (data && data.me) {
        handleLogin();
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
});
export default React.memo(Layout);
