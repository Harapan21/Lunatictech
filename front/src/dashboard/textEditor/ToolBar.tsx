import * as React from 'react';
import style from '../../../public/style.scss';
import Gear from '../../../public/settings.svg';
import { Field } from 'formik';
import { Status } from './index';

import Maximize from '../../../public/maximize.svg';
import Reduce from '../../../public/reduce.svg';
import { TRIGGER_MENU } from '../../redux/constan';
import { useDispatch, useSelector } from 'react-redux';
export default () => {
  const [isSetting, setSetting] = React.useState(false);
  const dispatch = useDispatch();
  const IS_POST_TOGGLE = useSelector(({ menu }: any) => menu.toggle);
  const menu = {
    main: [
      {
        text: <Gear style={{ width: '15px' }} />,
        onClick: () => {
          setSetting((state: any) => !state);
        }
      },
      {
        text: (
          <Field component="select" name="status" className={style.select}>
            <option value={Status.DRAFT}>Draft</option>
            <option value={Status.HIDE}>Hide</option>
            <option value={Status.PUBLISH}>Publish</option>
          </Field>
        )
      },
      { text: <span style={{ fontSize: '.5rem' }}>Image</span> },
      {
        text: <span style={{ fontSize: '.6rem', fontWeight: 700 }}>H</span>
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
      { text: <span style={{ fontSize: '.5rem' }}>Right</span> },
      {
        text: IS_POST_TOGGLE ? (
          <Reduce style={{ width: '12px' }} />
        ) : (
          <Maximize style={{ width: '12px' }} />
        ),
        onClick: () => dispatch({ type: TRIGGER_MENU })
      }
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
