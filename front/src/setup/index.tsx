import { Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import validation from '../validation';
import style from '../../public/style.scss';
import Page from './Page';
import { UPLOAD_FILE, DAFTAR } from '../apollo/mutation';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
export default withRouter(({ history }: any) => {
  const initialValues = {
    fullName: '',
    userName: '',
    emailAddress: '',
    passwordUsr: '',
    avatar: null
  };
  const [stepIndex, setIndex] = React.useState(0);
  const [singleUpload] = useMutation(UPLOAD_FILE);
  const [daftar] = useMutation(DAFTAR, {
    onCompleted({ daftar }) {
      localStorage.setItem('token', daftar.token);
    }
  });
  const handleSubmit = (values: UserSetup) => {
    const { emailAddress, fullName, passwordUsr, userName, avatar } = values;
    singleUpload({
      variables: { file: avatar, username: userName }
    })
      .then(({ data: { singleUpload } }: any) => {
        daftar({
          variables: {
            username: userName,
            email: emailAddress,
            fullname: fullName,
            password: passwordUsr,
            avatar: singleUpload.path
          }
        });
      })
      .then(() => {
        history.push('/');
      });
  };
  return (
    <div className={style.setup}>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validation}
        onSubmit={(values: UserSetup) => handleSubmit(values)}
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
});
