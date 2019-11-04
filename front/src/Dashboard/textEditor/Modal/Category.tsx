import * as React from 'react';
import CategoryListItem from './CategoryListItem';
const Category: React.SFC<any> = React.memo(() => {
  const [Selected, setSelected] = React.useState<SelectedCategoryListState[]>(
    []
  );
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
          overflow: 'hidden',
          width: '100%'
        }}
      >
        <li
          style={{
            width: '100%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
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

          <ul
            style={{
              position: 'absolute',
              right: 0,
              display: 'inline-flex',
              listStyle: 'none',
              padding: 5
            }}
          >
            {Selected.map(({ id, name }) => (
              <li
                key={id}
                style={{
                  fontSize: '0.5rem',
                  marginRight: 5,
                  marginLeft: 5,
                  textAlign: 'center',
                  padding: 2,
                  background: 'var(--white-pink)',
                  borderRadius: 5
                }}
              >
                {name}
              </li>
            ))}
          </ul>
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
