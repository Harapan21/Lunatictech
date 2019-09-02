import * as React from 'react';
import Logo from '../../public/Smile.svg';
import style from '../../public/style.scss';
export default function Loading({ width = 50 }: { width: number }) {
  return <Logo width={width} className={style.animatedSvg} />;
}
