import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import validation from '../validation';
import style from '../../public/style.scss';
import Page from './Page';
export default () => {
  const initialValues = {
    fullName: '',
    userName: '',
    emailAddress: '',
    passwordUsr: '',
    avatar: null
  };
  const [stepIndex, setIndex] = React.useState(0);
  return (
    <div className={style.setup}>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validation}
        onSubmit={(values: UserSetup) => {
          alert(JSON.stringify(values));
        }}
        render={(formikBag: FormikProps<UserSetup>) => {
          return (
            <Form style={{ all: 'inherit' }} id="setupForm">
              <Page
                state={stepIndex}
                setStateIndex={(value: number) => setIndex(value)}
              />
            </Form>
          );
        }}
      />
    </div>
  );
};
