import * as React from "react";
import CategoryListItem from "./CategoryListItem";
import Close from "../../../../public/close.svg";
const Category: React.SFC<any> = React.memo(() => {
  const [Selected, setSelected] = React.useState<SelectedCategoryListState[]>(
    []
  );

  const isCotains = React.useCallback(
    (idFiltered: ID) =>
      Selected.some(({ id }: SelectedCategoryListState) => id === idFiltered),
    [Selected]
  );
  const [typed, setTyped] = React.useState({ word: "", isType: false });
  const handleChange = React.useCallback(
    (e: any) => {
      setTyped({ word: e.target.value, isType: e.target.value.length > 0 });
    },
    [setTyped, typed]
  );
  const handleCategory = React.useCallback(
    ({ id, name }: SelectedCategoryListState) =>
      isCotains(id)
        ? setSelected((state: SelectedCategoryListState[]) =>
            state.filter((e: SelectedCategoryListState) => e.id !== id)
          )
        : setSelected((state: SelectedCategoryListState[]) => [
            ...state,
            { name, id }
          ]),
    [isCotains, setSelected, Selected]
  );
  return (
    <div>
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          background: "var(--white)",
          padding: 0,
          overflow: "hidden",
          width: "100%"
        }}
      >
        <li
          style={{
            width: "100%",
            position: "relative",
            display: "flex",
            alignItems: "center"
          }}
        >
          <input
            onChange={handleChange}
            placeholder="Search Category"
            style={{
              border: 0,
              padding: 10,
              background: "inherit",
              fontSize: "var(--font-size-default)",
              width: "100%",
              opacity: typed.isType ? 1 : 0.6,
              boxSizing: "border-box"
            }}
          />

          <ul
            style={{
              position: "absolute",
              right: 0,
              display: "inline-flex",
              listStyle: "none",
              padding: 5
            }}
          >
            {Selected.map((props: SelectedCategoryListState) => (
              <li
                key={props.id}
                onClick={() => handleCategory(props)}
                style={{
                  fontSize: "0.5rem",
                  marginRight: 5,
                  marginLeft: 5,
                  textAlign: "center",
                  padding: 3,
                  background: "var(--white-pink)",
                  borderRadius: 5,
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                {props.name}
                <span style={{ cursor: "pointer", marginLeft: 5 }}>
                  <Close height={8} />
                </span>
              </li>
            ))}
          </ul>
        </li>
        <CategoryListItem
          Selected={Selected}
          typed={typed}
          isCotains={isCotains}
          handleCategory={handleCategory}
        />
      </ul>
    </div>
  );
});

export default Category;
