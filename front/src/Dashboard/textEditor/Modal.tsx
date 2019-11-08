import * as React from "react";
import Thumbnail from "./Modal/Thumbnail";
import Category from "./Modal/Category";
import style from "../../../public/style.scss";
import Close from "../../../public/close.svg";

const Modal: React.SFC<ModalProps> = React.memo(({ setToggle, user }) => {
  const [menu] = React.useState([
    { item: "Thumbnail", Content: <Thumbnail image={user.data.me} /> },
    { item: "Category", Content: <Category /> }
  ]);
  const [menuModal, setMenuModal] = React.useState(0);
  const Content = React.useCallback(
    () => menu[menuModal] && menu[menuModal].Content,
    [menuModal]
  );

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.6)",
        zIndex: 4
      }}
    >
      <div
        style={{
          background: "var(--white)",
          width: "95%",
          height: "90%",
          boxShadow: "var(--shadow-2-xl)",
          border: "1px solid (--grey)",
          borderRadius: 10,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        {Content()}
        <div
          style={{
            fontSize: "var(--font-size-default)",
            padding: "10px 20px",
            fontWeight: 700,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <ul className={style.modalmenu}>
            {menu.map(({ item }, idx) => (
              <li
                key={idx}
                onClick={() => setMenuModal(idx)}
                className={`${idx === menuModal ? style.active : ""}`}
              >
                {item}
              </li>
            ))}
          </ul>
          <button
            type="button"
            style={{
              all: "unset",
              cursor: "pointer",
              fontSize: "var(--font-size-medium)"
            }}
            onClick={setToggle}
          >
            <Close height={15} />
          </button>
        </div>
      </div>
    </div>
  );
});

export default Modal;
