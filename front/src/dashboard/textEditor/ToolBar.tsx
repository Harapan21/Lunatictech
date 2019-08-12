import * as React from 'react';
import style from '../../../public/style.scss';
export default React.memo(() => {
  const [isSetting, setSetting] = React.useState(false);
  const menu = {
    main: [
      {
        text: <span style={{ fontSize: '.5rem' }}>Setting</span>,
        onClick: () => {
          setSetting((state: any) => !state);
        }
      },
      { text: <span style={{ fontSize: '.5rem' }}>Preview</span> },
      {
        text: 'B'
      },
      {
        text: <span style={{ fontStyle: 'italic' }}>I</span>
      },
      { text: <span style={{ textDecoration: 'underline' }}>U</span> },
      { text: <span style={{ fontSize: '.5rem' }}>Left</span> },
      { text: <span style={{ fontSize: '.5rem' }}>Center</span> },
      { text: <span style={{ fontSize: '.5rem' }}>Right</span> }
    ],
    setting: [
      {
        text: <span style={{ fontSize: '.5rem' }}>x</span>,
        onClick: () => {
          setSetting((state: any) => !state);
        }
      },
      { text: <span style={{ fontSize: '.5rem' }}>Movie</span> }
    ]
  };
  return (
    <div
      className={style.card}
      style={{
        display: 'flex',
        fontSize: '.625rem',
        width: 'max-content'
      }}
      ref={(el: any) => {
        if (el) {
          el.style.setProperty('margin', '2px 5px', 'important');
        }
      }}
    >
      {isSetting
        ? menu.main.map(({ text, onClick }: any, index) => (
            <button
              type="button"
              onClick={onClick}
              key={index}
              style={{
                all: 'unset',
                cursor: 'pointer',
                margin: '0px 15px',
                userSelect: 'none'
              }}
            >
              {text}
            </button>
          ))
        : menu.setting.map(({ text, onClick }: any, index) => (
            <button
              type="button"
              onClick={onClick}
              key={index}
              style={{
                all: 'unset',
                cursor: 'pointer',
                margin: '0px 15px',
                userSelect: 'none'
              }}
            >
              {text}
            </button>
          ))}
    </div>
  );
});
