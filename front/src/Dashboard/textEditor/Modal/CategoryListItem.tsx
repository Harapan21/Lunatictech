import * as React from "react";
// import Plus from '../../../public/plus.svg';
import { useQuery } from "@apollo/react-hooks";
import { GET_CATEGORY } from "../../../apollo/query";
import Loading from "../../../components/Loading";

const CategoryListItem: React.SFC<CategoryListItemProps> = ({
  Selected,
  typed,
  isCotains,
  handleCategory
}) => {
  const getCatgory = React.useCallback(
    () => useQuery(GET_CATEGORY, { fetchPolicy: "network-only" }),
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

  const handleSearch = React.useCallback(
    (menu: CategoryListState[]) =>
      typed.isType
        ? menu.filter((e: CategoryListState) =>
            e.name.toLowerCase().includes(typed.word.toLowerCase())
          )
        : menu.filter((e: CategoryListState) => e.child || !isCotains(+e.id)),
    [typed, Selected, isCotains]
  );
  const CategoryListFitered = handleSearch(CategoryList);
  const IsNotFound = CategoryListFitered.length === 0;
  const InlineListStyle: React.CSSProperties = {
    padding: 40,
    textAlign: "center"
  };

  const ListItem = React.useCallback(
    ({ name, id, child }: CategoryListState) => {
      const ChildListFiltered =
        child &&
        handleSearch(child).map(({ id, name }: CategoryListState) =>
          ListItem({ id: +id, name })
        );
      return (
        <React.Fragment key={id}>
          <li
            onClick={() => handleCategory({ name, id })}
            key={id}
            style={{
              background: isCotains(id) ? "var(--pink)" : "var(--white)",
              color: isCotains(id) ? "var(--white)" : "var(--black)",
              fontSize: "var(--font-size-medium)",
              cursor: "pointer",
              padding: 10,
              position: "relative"
            }}
          >
            {name}
          </li>
          {ChildListFiltered}
        </React.Fragment>
      );
    },
    [isCotains, CategoryListFitered, handleSearch]
  );
  return (
    <>
      {loading ? (
        <li style={InlineListStyle}>
          <Loading width={20} />
        </li>
      ) : IsNotFound ? (
        <li
          style={{
            opacity: 0.3,
            fontWeight: 700,
            fontSize: "1rem",
            ...InlineListStyle
          }}
        >
          Enter to create new category
        </li>
      ) : (
        CategoryListFitered.map(({ id, ...props }: CategoryListState) => {
          // tslint:disable-next-line: variable-name
          // const m_id = +id;
          // const ChildList = child.map(({ id: idchild, name: namechild }) => {
          //   // tslint:disable-next-line: variable-name
          //   const _idchild = +idchild;

          //   return (
          //     <ListItem key={_idchild} name={namechild} idpassed={_idchild} />
          //   );
          // });
          return ListItem({ id: +id, ...props });
        })
      )}
    </>
  );
};

export default CategoryListItem;
