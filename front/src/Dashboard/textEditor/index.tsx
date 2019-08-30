import * as React from 'react';
import { Formik, Form } from 'formik';
const TextEditor: React.SFC<any> = () => {
  return (
    <Formik
      render={(props: any) => {
        <Form></Form>;
      }}
    />
  );
};

export default TextEditor;
