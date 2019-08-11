import * as React from 'react';
import { Formik, Form, FormikProps } from 'formik';
import style from '../../public/style.scss';
export default function PostResult() {
  const [toggle, setToggle] = React.useState(false);
  return (
    <div
      className={style.postField}
      style={{
        position: toggle ? 'fixed' : 'absolute'
      }}
    >
      <div id="review" />
      <button
        className={style.button}
        onClick={() => setToggle((state: boolean) => !state)}
      >
        {toggle ? 'Kecilin' : 'Gedein'}
      </button>
    </div>
  );
}
