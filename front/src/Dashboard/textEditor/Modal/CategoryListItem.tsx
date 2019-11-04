import * as React from 'react';
// import Plus from '../../../public/plus.svg';
import { useQuery } from '@apollo/react-hooks';
import { GET_CATEGORY } from '../../../apollo/query';
import Loading from '../../../components/Loading';
interface CategoryListItemProps {
  Selected: SelectedCategoryListState[];
  typed: { word: string; isType: boolean };
  setSelected: React.Dispatch<
    React.SetStateAction<SelectedCategoryListState[]>
  >;
}

const CategoryListItem: React.SFC<CategoryListItemProps> = ({
  Selected,
  typed,
  setSelected
}) => {
  const getCatgory = React.useCallback(
    () => useQuery(GET_CATEGORY, { fetchPolicy: 'network-only' }),
    []
  );
  const { data, loading } = getCatgory();
  const [CategoryList, setCategoryList] = React.useState<CategoryListState[]>(
    []
  );
  React.useEffect(() => {
    if (!loading && data && data.category) {
      setCategoryList(data.category);
    }
  }, [loading]);
  const isCotains = React.useCallback(
    (idFiltered: number) =>
      Selected.some(({ id }: SelectedCategoryListState) => id === idFiltered),
    [Selected, CategoryList]
  );
  const handleSearch = React.useCallback(
    (menu) =>
      typed.isType
        ? menu.filter((e: CategoryListState) =>
            e.name.toLowerCase().includes(typed.word.toLowerCase())
          )
        : menu.filter((e: CategoryListState) => !isCotains(+e.id)),
    [typed, Selected, isCotains]
  );
  const CategoryListFitered = handleSearch(CategoryList);
  const IsNotFound = CategoryListFitered.length === 0;
  const inlineLiStyle: React.CSSProperties = {
    padding: 40,
    textAlign: 'center'
  };

  const ListItem = React.useCallback(
    (name, idpassed) => (
      <li
        onClick={() =>
          isCotains(idpassed)
            ? setSelected((state: SelectedCategoryListState[]) =>
                state.filter(
                  (e: SelectedCategoryListState) => e.id !== idpassed
                )
              )
            : setSelected((state: SelectedCategoryListState[]) => [
                ...state,
                { name, id: idpassed }
              ])
        }
        key={idpassed}
        style={{
          background: isCotains(idpassed) ? 'var(--pink)' : 'var(--white)',
          color: isCotains(idpassed) ? 'var(--white)' : 'var(--black)',
          fontSize: 'var(--font-size-medium)',
          cursor: 'pointer',
          padding: 10,
          position: 'relative'
        }}
      >
        {name}
      </li>
    ),
    [isCotains, CategoryListFitered]
  );
  return (
    <>
      {loading ? (
        <li style={inlineLiStyle}>
          <Loading width={20} />
        </li>
      ) : IsNotFound ? (
        <li
          style={{
            opacity: 0.3,
            fontWeight: 700,
            fontSize: '1rem',
            ...inlineLiStyle
          }}
        >
          Enter to create new category
        </li>
      ) : (
        CategoryListFitered.map(({ name, id, child }) => {
          // child.map(({ id: idchild, name: namechild }) => {
          //   // tslint:disable-next-line: variable-name
          const _id = +id;
          //   // tslint:disable-next-line: variable-name
          //   const _idchild = +idchild;

          //   return <>
          //     <ListItem idpassed={_idchild} name={namechild} />
          //   </>;
          // });
          return ListItem(name, _id);
        })
      )}
    </>
  );
};

export default CategoryListItem;
