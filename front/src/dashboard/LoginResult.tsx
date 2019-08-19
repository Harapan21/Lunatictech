import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../apollo/mutation';
import style from '../../public/style.scss';
import { LoginValidation } from '../validation';
import InputLarge from '../setup/field_component/InputLarge';
export default withRouter(({ history }) => {
  const InitValuesLogin = {
    userName: '',
    passwordUsr: ''
  };
  const [login] = useMutation(LOGIN, {
    onCompleted({ login }) {
      localStorage.setItem('token', login.token);
      history.push('/');
    }
  });
  const [step, setStep] = React.useState(0);
  const handleState = () => setStep((state: number) => state + 1);

  const FieldInput = (props: any) => InputLarge<LoginPage>(props);
  const LoginStep = (handleState: () => void) => [
    <Field
      key={0}
      type="text"
      name="userName"
      onClick={handleState}
      label="Enter Your Username"
      component={FieldInput}
    />,
    <Field
      key={1}
      type="text"
      name="passwordUsr"
      onClick={handleState}
      label="Enter Your Password"
      component={FieldInput}
    />
  ];

  return (
    <div className={style.setup}>
      <Formik
        validationSchema={LoginValidation}
        onSubmit={(values: LoginPage) => {
          login({
            variables: {
              username: values.userName,
              password: values.passwordUsr
            }
          });
        }}
        initialValues={InitValuesLogin}
        render={() => <Form>{LoginStep(handleState)[step]}</Form>}
      />
    </div>
  );
});
