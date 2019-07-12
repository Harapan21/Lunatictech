import * as React from 'react';
import Danger from '../public/danger.svg';
import style from '../public/style.scss';

interface ErrorBoxProps {
  errorMsg: string;
}

const ErrorBox = ({errorMsg}: ErrorBoxProps) => {
  return (
    <div
      style={{maxWidth: '230px'}}
      className={`${style.card} ${style.danger}`}
    >
      <Danger />
      <div>{errorMsg}</div>
    </div>
  );
};

export default ErrorBox;
