import * as React from 'react';
import CategoryListItem from './CategoryListItem';
const Category: React.SFC<any> = React.memo(() => {
  const [Selected, setSelected] = React.useState<number[]>([]);
  const [typed, setTyped] = React.useState({ word: '', isType: false });
  const handleChange = React.useCallback(
    (e: any) => {
      setTyped({ word: e.target.value, isType: e.target.value.length > 0 });
    },
    [setTyped, typed]
  );
  return (
    <div>
      <ul
        style={{
          listStyle: 'none',
          margin: 0,
          background: 'var(--white)',
          padding: 0,
          borderRadius: 10,
          overflow: 'hidden',
          width: '100%'
        }}
      >
        <li
          style={{
            width: '100%'
          }}
        >
          <input
            onChange={handleChange}
            placeholder="Search Category"
            style={{
              border: 0,
              padding: 10,
              background: 'inherit',
              fontSize: 'var(--font-size-default)',
              width: '100%',
              opacity: typed.isType ? 1 : 0.6,
              boxSizing: 'border-box'
            }}
          />
        </li>
        <CategoryListItem
          Selected={Selected}
          typed={typed}
          setSelected={setSelected}
        />
      </ul>
    </div>
  );
});

export default Category;
