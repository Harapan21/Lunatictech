import * as React from 'react';
import { Formik, Form, FormikProps, Field } from 'formik';
import style from '../../../public/style.scss';
import { useSelector } from 'react-redux';
import AreaText from './AreaText';
import ToolBar from './ToolBar';
import * as Yup from 'yup';
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
  const IS_POST_TOGGLE = useSelector(({ menu }: any) => menu.toggle);
  const author = useSelector((state: any) => state.user.data.me.user_id);
  const initialValues = {
    title: '',
    author,
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
      validationSchema={Yup.object().shape({
        title: Yup.string().required(),
        content: Yup.string().required()
      })}
      onSubmit={(values: PostField) => console.log(values)}
      render={(_FORMIK_PROPS: FormikProps<PostField>) => {
        return (
          <Form
            className={style.formPost}
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
            <div className={style.postField}>
              <div className={style.title}>
                <Field
                  name="title"
                  placeholder="Title"
                  className={style.form}
                />
                {_FORMIK_PROPS.isValid ? (
                  <button
                    type="button"
                    style={{ fontSize: '.6rem', color: 'var(--blue)' }}
                    className={style.button}
                  >
                    Post
                  </button>
                ) : (
                  <button
                    type="button"
                    style={{ fontSize: '.7rem', color: 'var(--pink)' }}
                    className={style.button}
                    onClick={toggle}
                  >
                    X
                  </button>
                )}
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
            </div>
          </Form>
        );
      }}
    />
  );
}

export default React.memo(TextEditor);
