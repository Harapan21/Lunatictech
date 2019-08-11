import * as React from 'react';
import { Formik, Form, FormikProps, Field } from 'formik';
import style from '../../public/style.scss';
import { useSelector, useDispatch } from 'react-redux';
import { TRIGGER_MENU } from '../redux/constan';

export enum Status {
  PUBLISH = 'publish',
  DRAFT = 'draft',
  HIDE = 'hide'
}

const CustomField = ({ field, form, ...props }) => {
  return <textarea {...field} {...props} />;
};

export default function PostResult() {
  const dispatch = useDispatch();
  const IS_POST_TOGGLE = useSelector(({ menu }: any) => menu.toggle);

  const initialValues = {
    title: '',
    author: '',
    content: '',
    status: Status.DRAFT
  };
  return (
    <Formik
      initialValues={initialValues}
      // tslint:disable-next-line:no-console
      onSubmit={(values: PostField) => console.log(values)}
      render={(_FORMIK_PROPS: FormikProps<PostField>) => {
        return (
          <Form>
            <div
              className={style.postField}
              style={{
                position: IS_POST_TOGGLE ? 'fixed' : 'initial'
              }}
            >
              <div className={style.title}>
                <Field
                  name="title"
                  placeholder="Title"
                  className={style.form}
                />
                <button
                  className={style.button}
                  onClick={() => dispatch({ type: TRIGGER_MENU })}
                >
                  {IS_POST_TOGGLE ? 'Kecilin' : 'Gedein'}
                </button>
              </div>
              <Field
                name="content"
                className={style.content}
                style={{
                  width: '100%'
                }}
                placeholder="Type Here..."
                component={CustomField}
              />
              <div id="review" />
            </div>
          </Form>
        );
      }}
    />
  );
}
