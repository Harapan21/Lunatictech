import * as React from 'react';
import { Field, FieldProps } from 'formik';
import CategoryList from './CategoryList';
import style from '../../../public/style.scss';
const Content: React.SFC<any> = ({ children }) => (
  <Field
    name="content"
    render={({
      field,
      form: { touched, errors },
      type,
      ...props
    }: FormSmileFieldProps<FieldProps>) => {
      const isError = touched[field.name] && errors[field.name];
      return (
        <div
          style={{
            position: 'relative',
            height: '100%',
            width: '100%',
            display: 'flex'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
          >
            <textarea
              placeholder="Type Here..."
              className={style.textarea}
              style={{
                opacity: isError ? 0.6 : 1,
                background: isError ? 'var(--grey)' : 'var(--white)'
              }}
              {...props}
              {...field}
            />

            <CategoryList />
          </div>
          {children}
        </div>
      );
    }}
  />
);

export default Content;
