import * as React from 'react';
import { Field, FieldProps } from 'formik';

import CategoryList from './CategoryList';
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
              style={{
                resize: 'none',
                width: '100%',
                height: '100%',
                padding: 'var(--padding-small)',
                margin: 0,
                scrollbarWidth: 'thin',
                scrollbarColor: 'var(--pink) transparent',
                scrollBehavior: 'smooth',
                boxSizing: 'border-box',
                opacity: isError ? 0.6 : 1,
                background: isError ? 'var(--grey)' : 'var(--white)',
                fontFamily: 'var(--font-defuault)',
                border: 'none',
                fontSize: 'var(--font-size-default)'
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
