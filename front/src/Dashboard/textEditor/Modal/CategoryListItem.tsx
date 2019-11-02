import * as React from 'react';
// import Plus from '../../../public/plus.svg';
import { useQuery } from '@apollo/react-hooks';
import { GET_CATEGORY } from '../../../apollo/query';
import Loading from '../../../components/Loading';
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
  const getCatgory = React.useCallback(() => useQuery(GET_CATEGORY, { fetchPolicy: 'network-only' }), []);
  const { data, loading } = getCatgory();
  const [CategoryList, setCategoryList] = React.useState<CategoryListState[]>(
    []
  );
  React.useEffect(() => {
    if (!loading && data && data.category) {
      setCategoryList(data.category);
    }
  }, [loading]);

  const handleSearch = React.useCallback((menu) => {
    return typed.isType
      ? menu.filter((e: CategoryListState) => e.name.toLowerCase().includes(typed.word.toLowerCase()))
      : menu;
  }, [typed]);
  const CategoryListFitered = handleSearch(CategoryList);
  const IsNotFound = CategoryListFitered.length === 0;
  const inlineLiStyle: React.CSSProperties = { padding: 40, textAlign: 'center' };
  const isCotains = React.useCallback((idFiltered: number) => Selected.includes(idFiltered), [Selected]);
  return (
    <>
      {loading ?
        (
          <li style={inlineLiStyle}>
            <Loading width={20} />
          </li>
        )
        :
        (
          IsNotFound ?
            <li style={{ opacity: 0.3, fontWeight: 700, fontSize: '1rem', ...inlineLiStyle }}>Enter to create new category</li>
            :
            CategoryListFitered.map(({ name, id }) => {
              const idasnumber = +id;
              return (
                <li
                  onClick={() =>
                    isCotains(idasnumber)
                      ? setSelected((state: number[]) =>
                        state.filter((e: number) => e !== idasnumber)
                      )
                      : setSelected((state: number[]) => [...state, idasnumber])
                  }
                  key={idasnumber}
                  style={{
                    borderRight: isCotains(idasnumber) ? '2px solid  var(--pink)' : 'none',
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
                    {parent ? parent.name : 'Parent'}
                  </span>
                </li>
              );
            })
        )}
    </>
  );
};

export default CategoryListItem;
