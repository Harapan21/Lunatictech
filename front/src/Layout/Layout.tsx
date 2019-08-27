import * as React from 'react';
import style from '../../public/style.scss';
export default class Layout extends React.Component<LayoutProps, LayoutState> {
  public state = {
    isLogin: false,
    active: 0
  };

  public render() {
    const { children } = this.props;
    const { active } = this.state;
    const Switcher = (active === 0 || 1) && (
      <button
        type="button"
        onClick={() =>
          this.setState((state: LayoutState) => ({
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
      <div className={style.layout}>
        {children ? (
          children({
            ...this.state,
            handleLayoutState: (payload: LayoutState) => this.setState(payload),
            switcher: Switcher
          })
        ) : (
          <div>Error</div>
        )}
      </div>
    );
  }
}
