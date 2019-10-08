import * as React from 'react';
import CategoryListIcon from '../../../public/list.svg';
// import Plus from '../../../public/plus.svg';
import { useQuery } from '@apollo/react-hooks';
import { GET_CATEGORY } from '../../apollo/query';
import Loading from '../../components/Loading';

interface CategoryListItemProps {
  Selected: number[];
  typed: { word: string; isType: boolean };
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
}

const CategoryListItem: React.SFC<CategoryListItemProps> = ({
  Selected,
  typed,
  setSelected
}) => {
  const getCatgory = React.useCallback(() => useQuery(GET_CATEGORY), []);
  const { data, loading } = getCatgory();

  const [CategoryList, setCategoryList] = React.useState<CategoryListState[]>(
    []
  );
  React.useEffect(() => {
    if (!loading && data && data.category) {
      setCategoryList(data.category);
    }
  }, [loading]);
  const handleSearch = typed.isType
    ? CategoryList.filter((e: CategoryListState) =>
        e.name.toLowerCase().includes(typed.word.toLowerCase())
      )
    : CategoryList;

  return (
    <>
      {loading ? (
        <li style={{ padding: 40, textAlign: 'center' }}>
          <Loading width={20} />
        </li>
      ) : (
        handleSearch.map(({ name, id, parent }) => {
          const idasnumber = id as number;
          const isCotains = Selected.includes(idasnumber);
          return (
            <li
              onClick={() =>
                isCotains
                  ? setSelected((state: number[]) =>
                      state.filter((e: number) => e !== idasnumber)
                    )
                  : setSelected((state: number[]) => [...state, idasnumber])
              }
              key={idasnumber}
              style={{
                fontSize: 'var(--font-size-medium)',
                cursor: 'pointer',
                padding: 10,
                borderRight: isCotains ? '2px solid  var(--pink)' : 'none',
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
                {parent ? parent.name : 'Parent'}
              </span>
            </li>
          );
        })
      )}
    </>
  );
};

const CategoryList: React.SFC = React.memo(() => {
  const [Selected, setSelected] = React.useState<number[]>([]);
  const [isActive, setActive] = React.useState(false);
  const [typed, setTyped] = React.useState({ word: '', isType: false });
  const handleChange = (e: any) => {
    setTyped({ word: e.target.value, isType: e.target.value.length > 0 });
  };
  const handleClick = React.useCallback(
    () => setActive((state: boolean) => !state),
    [isActive, setActive]
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
      <ul
        style={{
          display: isActive ? 'block' : 'none',
          listStyle: 'none',
          margin: 0,
          background: 'var(--white)',
          padding: 0,
          width: 500,
          borderRadius: 10,
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <CategoryListItem
          Selected={Selected}
          typed={typed}
          setSelected={setSelected}
        />
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
      <button
        style={{
          margin: '5px 0px',
          padding: 10,
          width: 'max-content',
          border: 0,
          background: 'var(--white)',
          borderRadius: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: 'var(--shadow-md)',
          cursor: 'pointer'
        }}
        onClick={() => handleClick()}
      >
        <CategoryListIcon width={15} height={15} />
      </button>
    </div>
  );
});
export default CategoryList;
