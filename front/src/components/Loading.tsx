import * as React from 'react';
import Logo from '../../public/Smile.svg';
import style from '../../public/style.scss';
export default function Loading() {
  return <Logo width={50} className={style.animatedSvg} />;
}
