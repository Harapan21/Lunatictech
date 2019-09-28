import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import FormSmileField from '../components/FormSmileField';
import style from '../../public/style.scss';
import Logo from '../../public/Smile.svg';
import * as Yup from 'yup';
import Quotes from '../components/Quotes';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN, validationUsername } from '../apollo/mutation';
import Loading from '../components/Loading';

const { quote, author } = Quotes();

export default React.memo(({ switcher, handleLogin }: LoginProps) => {
  const [login, { data, loading }] = useMutation(LOGIN);
  const [
    validateUsername,
    { data: ISVALID, loading: LOAD_VALIDATION }
  ] = useMutation(validationUsername);
  const handleValidateUsername = (value: string) => {
    validateUsername({
      variables: { username: value }
    });

    if (!LOAD_VALIDATION) {
      let error: string | null;
      // tslint:disable-next-line:no-unused-expression

      if (ISVALID && !ISVALID.validation.username) {
        error = 'Username is not valid';
      }
      return error;
    }
  };
  return (
    <Formik
      validationSchema={Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required('Password is required!')
      })}
      initialValues={{ username: '', password: '' }}
      onSubmit={(values: LoginFormValues, { setSubmitting }) => {
        login({ variables: { ...values } });
        if (!loading) {
          if (data && data.login) {
            handleLogin(data.login);
          } else {
            setSubmitting(false);
          }
        }
      }}
      render={({ isValid, isSubmitting }) => (
        <div className={style.section}>
          <div className={style.flexCenter}>
            {isSubmitting ? (
              <Loading />
            ) : (
              <Form
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '280px'
                }}
              >
                <span
                  style={{
                    padding: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: 'var(--font-size-default)'
                  }}
                >
                  <Logo width={20} style={{ marginRight: '10px' }} />
                  Smile
                </span>
                <Field
                  type="text"
                  name="username"
                  component={FormSmileField}
                  placeholder="Username"
                  validate={handleValidateUsername}
                />
                <Field
                  type="password"
                  name="password"
                  autoComplete="off"
                  component={FormSmileField}
                  placeholder="Password"
                />
                {switcher}
                {isValid && (
                  <button
                    type="submit"
                    className={isValid ? style.fadeIn : ''}
                    style={{
                      all: 'unset',
                      fontSize: 'var(--font-size-default)',
                      cursor: 'pointer',
                      padding: 'var(--padding-small)'
                    }}
                  >
                    Login
                  </button>
                )}
              </Form>
            )}
          </div>
          <div
            className={style.flexCenter}
            style={{ backgroundColor: '#E1F3F5', flexDirection: 'column' }}
          >
            <span
              style={{ fontSize: 'var(--font-size-default)', maxWidth: '80%' }}
            >
              {quote}
            </span>
            <span
              style={{
                fontSize: 'var(--font-size-default)',
                maxWidth: '80%',
                marginTop: '15px',
                fontWeight: 700
              }}
            >
              - {author} -
            </span>
          </div>
        </div>
      )}
    />
  );
});
