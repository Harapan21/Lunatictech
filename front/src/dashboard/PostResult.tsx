import * as React from 'react';
import TextEditor from './textEditor';
import style from '../../public/style.scss';
import PostCard from './textEditor/PostCard';
export default function PostResult() {
  const [isEditActive, setActiveButton] = React.useState(true);
  const handleChildToggle = () =>
    setActiveButton((isToggle: boolean) => !isToggle);
  return isEditActive ? (
    <TextEditor toggle={handleChildToggle} />
  ) : (
    <PostList toggle={handleChildToggle} />
  );
}

function PostList({ toggle }: Toggle) {
  const [post] = React.useState([
    { id: 1, title: 'cara', content: 'cara', author: 'harapan pardamean' }
  ]);

  return (
    <div>
      <div className={style.dashboard_title}>
        Your post
        <button
          onClick={toggle}
          className={style.dashboard_create_new}
          type="button"
        >
          Create New
        </button>
      </div>
      <div>
        {post.map((post: any) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
