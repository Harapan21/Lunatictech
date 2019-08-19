import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
// import { useMutation } from '@apollo/react-hooks';
// import { LOGIN } from '../apollo/mutation';
import style from '../../public/style.scss';
import { LoginValidation } from '../validation';
import InputLarge from '../setup/field_component/InputLarge';
export default withRouter(() => {
  const InitValuesLogin = {
    userName: '',
    passwordUsr: ''
  };
  //   const [_LOGIN] = useMutation(LOGIN, {
  //     onCompleted({ login }) {
  //       localStorage.setItem('token', login.token);
  //     }
  //   });
  const [step] = React.useState(0);
  const FieldInput = (props: any) => InputLarge<LoginPage>(props);
  const LoginStep = [
    <Field
      key={0}
      type="text"
      name="userName"
      label="Enter Your Username"
      component={FieldInput}
    />,
    <Field
      key={1}
      type="text"
      name="passwordUsr"
      label="Enter Your Password"
      component={FieldInput}
    />
  ];
  return (
    <div className={style.setup}>
      <Formik
        validationSchema={LoginValidation}
        onSubmit={(values: LoginPage) => console.log(values)}
        initialValues={InitValuesLogin}
        render={() => <Form>{LoginStep[step]}</Form>}
      />
    </div>
  );
});
