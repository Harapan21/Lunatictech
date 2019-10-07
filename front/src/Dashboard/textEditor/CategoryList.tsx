import * as React from 'react';

// import Plus from '../../../public/plus.svg';
import { useQuery } from '@apollo/react-hooks';
import { GET_CATEGORY } from '../../apollo/query';
import Loading from '../../components/Loading';

const CategoryList: React.SFC = React.memo(() => {
  console.log('render');
  const getCatgory = React.useCallback(() => useQuery(GET_CATEGORY), []);
  const { data, loading } = getCatgory();
  const [CategoryList, setCategoryList] = React.useState<CategoryListState[]>(
    []
  );
  const [isActive, setActive] = React.useState(false);
  const [typed, setTyped] = React.useState({ word: '', isType: false });
  const handleChange = React.useCallback(
    (e: any) => {
      setTyped({ word: e.target.value, isType: e.target.value.length > 0 });
    },
    [typed, setTyped]
  );
  const handleClick = React.useCallback(
    () => setActive((state: boolean) => !state),
    [isActive, setActive]
  );
  React.useEffect(() => {
    if (!loading && data && data.category) {
      setCategoryList(data.category);
    }
  }, [loading]);
  const handleSearch = React.useCallback(
    () =>
      typed.isType
        ? CategoryList.filter((e: CategoryListState) =>
            e.name.toLowerCase().includes(typed.word)
          )
        : CategoryList,
    [typed, CategoryList]
  );

  const listCategory = React.useCallback(
    () => (
      <ul
        style={{
          display: isActive ? 'block' : 'none',
          listStyle: 'none',
          margin: 0,
          background: 'var(--white)',
          padding: 0,
          width: 500,
          borderRadius: 10,
          boxShadow: 'var(--shadow-md)'
        }}
      >
        {loading ? (
          <li style={{ padding: 40, textAlign: 'center' }}>
            <Loading width={20} />
          </li>
        ) : (
          handleSearch().map(({ name, id, parent }) => (
            <li
              key={id}
              style={{
                fontSize: 'var(--font-size-medium)',
                cursor: 'pointer',
                padding: 10,
                position: 'relative',
                borderBottom: '1px solid var(--grey)'
              }}
            >
              {name}
              <span
                style={{
                  position: 'absolute',
                  right: 10,
                  margin: 'auto'
                }}
              >
                {parent ? 'Children' : 'Parent'}
              </span>
            </li>
          ))
        )}
        <li
          style={{
            fontSize: 'var(--font-size-medium)',
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
              width: '100%',
              opacity: typed.isType ? 1 : 0.6,
              boxSizing: 'border-box'
            }}
          />
        </li>
      </ul>
    ),
    [isActive, handleChange, handleSearch]
  );
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding: 10,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 9999
      }}
    >
      {listCategory()}
      <button
        style={{
          margin: '5px 0px',
          padding: 10,
          width: 'max-content',
          border: 0,
          background: 'var(--white)',
          height: 30,
          borderRadius: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: 'var(--shadow-md)',
          cursor: 'pointer'
        }}
        onClick={() => handleClick()}
      >
        Category
      </button>
    </div>
  );
});
export default CategoryList;
