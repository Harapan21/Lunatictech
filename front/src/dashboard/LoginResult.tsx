import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { LOGIN } from '../apollo/mutation';
import style from '../../public/style.scss';
import { LoginValidation } from '../validation';
import InputLarge from '../setup/field_component/InputLarge';
import { useSelector, useDispatch } from 'react-redux';
import { GET_USER } from '../apollo/query';
import { USER_FETCH_SUCCEEDED, USER_FETCH_FAILED } from '../redux/constan';

function LoginResult() {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const { data, loading, called, refetch } = useQuery(GET_USER);

  React.useEffect(() => {
    console.log(loading, called, data);
    // if (!loading && called) {
    //   data && data.me !== null
    //     ? dispatch({
    //         type: USER_FETCH_SUCCEEDED,
    //         payload: { data, loading, isLogin: true }
    //       })
    //     : dispatch({
    //         type: USER_FETCH_FAILED,
    //         payload: { data, loading, isLogin: false }
    //       });
    // }
  }, [loading, data, called]);

  const InitValuesLogin = {
    userName: '',
    passwordUsr: ''
  };

  const [login] = useMutation(LOGIN, {
    onCompleted({ login }) {
      localStorage.setItem('token', login.token);
    }
  });
  // const dispatch = useDispatch();
  const HandleSubmit = React.useCallback(
    (values: LoginPage) => {
      login({
        variables: {
          username: values.userName,
          password: values.passwordUsr
        }
      });
      refetch();
    },
    [localStorage.getItem('token')]
  );

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
      type="password"
      name="passwordUsr"
      onClick={handleState}
      label="Enter Your Password"
      component={FieldInput}
    />
  ];

  return !user.loading && user.isLogin ? (
    <Redirect to="/" />
  ) : (
    <div className={style.setup}>
      <Formik
        validationSchema={LoginValidation}
        onSubmit={HandleSubmit}
        initialValues={InitValuesLogin}
        render={() => <Form>{LoginStep(handleState)[step]}</Form>}
      />
    </div>
  );
}

export default LoginResult;
