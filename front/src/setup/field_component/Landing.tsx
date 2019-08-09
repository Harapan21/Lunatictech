import * as React from 'react';
import Started from '../../../public/start.svg';
import style from '../../../public/style.scss';
export default ({ onClick }: any) => (
  <>
    <h1>Make smile manage your content</h1>
    <Started />
    <button onClick={onClick} type="button" className={style.buttonDefault}>
      Get Started
    </button>
  </>
);
