import * as React from 'react';
import style from '../../../public/style.scss';
import Gear from '../../../public/settings.svg';
export default () => {
  const [isSetting, setSetting] = React.useState(false);
  const menu = {
    main: [
      {
        text: <Gear style={{ width: '15px' }} />,
        onClick: () => {
          setSetting((state: any) => !state);
        }
      },
      { text: <span style={{ fontSize: '.5rem' }}>Preview</span> },

      {
        text: <span style={{ fontSize: '.6rem', fontWeight: 700 }}>h1</span>
      },
      {
        text: <span style={{ fontSize: '.520rem', fontWeight: 700 }}>h2</span>
      },
      {
        text: <span style={{ fontSize: '.460rem', fontWeight: 700 }}>h3</span>
      },
      {
        text: <span style={{ fontSize: '.6rem', fontWeight: 700 }}>B</span>
      },
      {
        text: <span style={{ fontStyle: 'italic', fontWeight: 700 }}>I</span>
      },
      {
        text: (
          <span style={{ textDecoration: 'underline', fontWeight: 700 }}>
            U
          </span>
        )
      },
      { text: <span style={{ fontSize: '.5rem' }}>Left</span> },
      { text: <span style={{ fontSize: '.5rem' }}>Center</span> },
      { text: <span style={{ fontSize: '.5rem' }}>Right</span> }
    ],
    setting: [
      {
        text: <span style={{ fontSize: '.650rem', fontWeight: 700 }}>x</span>,
        onClick: () => {
          setSetting((state: any) => !state);
        }
      },
      { text: <span style={{ fontSize: '.5rem' }}>Thumbnail</span> }
    ]
  };
  return (
    <div
      className={`${style.card} ${style.toolbar}`}
      ref={(el: any) => {
        if (el) {
          el.style.setProperty('margin', '2px 5px', 'important');
        }
      }}
    >
      {!isSetting
        ? menu.main.map(({ text, onClick }: any, index) => (
            <button
              type="button"
              onClick={onClick}
              className={style.item_toolbar}
              key={index}
            >
              {text}
            </button>
          ))
        : menu.setting.map(({ text, onClick }: any, index) => (
            <button
              type="button"
              onClick={onClick}
              className={style.item_toolbar}
              key={index}
            >
              {text}
            </button>
          ))}
    </div>
  );
};
