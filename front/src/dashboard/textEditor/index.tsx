import * as React from 'react';
import { Formik, Form, FormikProps, Field } from 'formik';
import style from '../../../public/style.scss';
import { useSelector, useDispatch } from 'react-redux';
import { TRIGGER_MENU } from '../../redux/constan';
import Maximize from '../../../public/maximize.svg';
import Reduce from '../../../public/reduce.svg';
import AreaText from './AreaText';
import ToolBar from './ToolBar';
export enum Status {
  PUBLISH = 'publish',
  DRAFT = 'draft',
  HIDE = 'hide'
}

function logSelection(event) {
  const selection = event.target.value.substring(
    event.target.selectionStart,
    event.target.selectionEnd
  );
}

function TextEditor({ toggle }: Toggle) {
  const dispatch = useDispatch();
  const IS_POST_TOGGLE = useSelector(({ menu }: any) => menu.toggle);

  const initialValues = {
    title: '',
    author: '',
    content: '',
    status: Status.DRAFT
  };
  React.useEffect(() => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.onselect = logSelection;
    }
  }, []);
  return (
    <Formik
      initialValues={initialValues}
      // tslint:disable-next-line:no-console
      onSubmit={(values: PostField) => console.log(values)}
      render={(_FORMIK_PROPS: FormikProps<PostField>) => {
        return (
          <Form className={style.formPost}>
            <div
              className={style.postField}
              style={
                IS_POST_TOGGLE
                  ? {
                      position: 'fixed',
                      top: '0px',
                      left: '0px',
                      right: '0px',
                      bottom: '0px',
                      width: '100%'
                    }
                  : {
                      position: 'initial'
                    }
              }
            >
              <div className={style.title}>
                <Field
                  name="title"
                  placeholder="Title"
                  className={style.form}
                />
                <button
                  type="button"
                  className={style.button}
                  onClick={() => dispatch({ type: TRIGGER_MENU })}
                >
                  {IS_POST_TOGGLE ? (
                    <Reduce style={{ width: '20px' }} />
                  ) : (
                    <Maximize style={{ width: '20px' }} />
                  )}
                </button>
                <button type="button" className={style.button} onClick={toggle}>
                  Close
                </button>
              </div>
              <ToolBar />
              <Field
                name="content"
                className={style.content}
                style={{
                  width: '100%'
                }}
                placeholder="Type Here..."
                component={AreaText}
              />
              <div id="review" />
            </div>
          </Form>
        );
      }}
    />
  );
}

export default React.memo(TextEditor);
