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
    ? CategoryList.filter((e: CategoryListState) => {
        const idasnumber = e.id as number;
        return (
          !Selected.includes(idasnumber) &&
          e.name.toLowerCase().includes(typed.word.toLowerCase())
        );
      })
    : CategoryList.filter(({ id }: CategoryListState) => {
        const idasnumber = id as number;
        return !Selected.includes(idasnumber);
      });
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

export default CategoryListItem;
