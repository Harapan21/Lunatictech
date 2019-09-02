import * as React from 'react';
import { Field, FieldProps } from 'formik';
const Title = () => (
  <Field
    type="text"
    name="title"
    render={({
      field,
      form: { touched, errors, isValid },
      ...props
    }: FormSmileFieldProps<FieldProps>) => {
      const isError = touched[field.name] && errors[field.name];
      return (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '50px',
            borderBottom: '1px solid var(--grey)'
          }}
        >
          <input
            {...props}
            {...field}
            placeholder="Title"
            style={{
              width: '100%',
              padding: 'var(--padding-small)',
              margin: 0,
              boxSizing: 'border-box',
              border: 'none',
              opacity: isError ? 0.6 : 1,
              background: isError ? 'var(--grey)' : 'var(--white)',
              fontSize: 'var(--font-size-default)',
              height: '100%'
            }}
          />

          {isValid && (
            <button
              type="submit"
              style={{
                all: 'unset',
                cursor: 'pointer',
                fontSize: 'var(--font-size-default)',
                color: 'var(--black)',
                position: 'absolute',
                right: 20,
                top: 0,
                bottom: 0
              }}
            >
              Post
            </button>
          )}
        </div>
      );
    }}
    placeholder="Title"
    style={{ width: '100%' }}
  />
);

export default Title;
