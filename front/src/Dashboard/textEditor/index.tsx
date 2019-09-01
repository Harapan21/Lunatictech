import * as React from 'react';
import { Formik, Form, FormikProps, Field, FieldProps } from 'formik';
import FormSmileField from '../../components/FormSmileField';
const TextEditor: React.SFC<any> = () => {
  return (
    <Formik
      initialValues={{
        title: '',
        content: '',
        status: 'draft'
      }}
      onSubmit={(values: TextEditorProps) => console.log(values)}
      render={(props: FormikProps<TextEditorProps>) => {
        return (
          <Form style={{ width: '100%' }}>
            <div
              style={{
                width: '98%',
                margin: 'auto',
                position: 'relative'
              }}
            >
              <Field
                name="title"
                component={FormSmileField}
                placeholder="Title"
                style={{ width: '100%' }}
              />
              <button
                type="submit"
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-default)',
                  color: 'var(--blue)',
                  position: 'absolute',
                  right: 15,
                  top: 0,
                  bottom: 0
                }}
              >
                Post
              </button>
            </div>

            <Field
              name="title"
              render={({
                field,
                form: { touched, errors },
                type,
                ...props
              }: FieldProps & any) => (
                <div>
                  <textarea {...props} {...field} />
                </div>
              )}
              placeholder="Title"
              style={{ width: '100%' }}
            />
          </Form>
        );
      }}
    />
  );
};

export default TextEditor;
