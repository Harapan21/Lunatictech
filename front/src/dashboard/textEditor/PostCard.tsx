import * as React from 'react';
import style from '../../../public/style.scss';

const PostCard: React.SFC = ({ title, content, author }: any) => (
  <div className={`${style.card} ${style.postcard}`}>
    <div className={style.title}>{title}</div>
    <div>{content}</div>
    <div>{author}</div>
  </div>
);

export default PostCard;
