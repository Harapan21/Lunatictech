import * as React from 'react';
import { Formik, Form, Field, FormikProps } from 'formik';
import FormSmileField from '../components/FormSmileField';
import FormSmileAvatar from '../components/FormSmileAvatar';
import style from '../../public/style.scss';
import Logo from '../../public/Smile.svg';
import * as Yup from 'yup';
import Quotes from '../components/Quotes';
import { useMutation } from '@apollo/react-hooks';
import {
  validationUsername,
  validationEmail,
  UPLOAD_FILE,
  DAFTAR
} from '../apollo/mutation';

const { quote, author } = Quotes();

export default React.memo(({ switcher, handleLogin }: RegisterProps) => {
  const [validateUsername, { data, loading }] = useMutation(validationUsername);
  const [singleUpload] = useMutation(UPLOAD_FILE);
  const [validateEmail, { data: emailResult, loading: loading1 }] = useMutation(
    validationEmail
  );
  const [daftar] = useMutation(DAFTAR, {
    onCompleted(data: { daftar: ReturnTokenLogin }) {
      // tslint:disable-next-line:no-unused-expression
      data && handleLogin(data.daftar);
    }
  });
  const [stateActive, setStateActive] = React.useState(0);
  const handleSubmit = ({ avatar, username, ...rest }: RegisterFormValues) => {
    singleUpload({
      variables: { file: avatar, username }
    }).then(({ data: { singleUpload } }: any) => {
      daftar({
        variables: {
          username,
          avatar: singleUpload.path,
          ...rest
        }
      });
    });
  };
  const handleValidateUsername = (value: string) => {
    validateUsername({
      variables: { username: value }
    });
    if (!loading) {
      let error: string | null;
      // tslint:disable-next-line:no-unused-expression
      if (data && data.validation.username) {
        error = 'Username has been use';
      }
      return error;
    }
  };
  const handleValidateEmail = (value: string) => {
    validateEmail({
      variables: { email: value }
    });
    if (!loading1) {
      let error: string | null;
      // tslint:disable-next-line:no-unused-expression
      if (emailResult && emailResult.validation.email) {
        error = 'Email has been use';
      }
      return error;
    }
  };
  return (
    <Formik
      validationSchema={Yup.object().shape({
        username: Yup.string()
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            'username not valid'
          )
          .required(),
        password: Yup.string()
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            'password not valid'
          )
          .min(8)
          .required('Password is required!'),
        email: Yup.string()
          .email()
          .required(),
        fullname: Yup.string().required(),
        avatar: Yup.string().required()
      })}
      initialValues={{
        username: '',
        password: '',
        email: '',
        fullname: '',
        avatar: null
      }}
      onSubmit={handleSubmit}
      render={({ isValid }: FormikProps<RegisterFormValues>) => {
        const Page = [
          // tslint:disable-next-line:jsx-key
          <>
            <Field
              type="file"
              name="avatar"
              style={{ margin: '10px 0px' }}
              component={FormSmileAvatar}
            />
            <Field
              type="email"
              name="email"
              style={{ margin: '10px 0px' }}
              component={FormSmileField}
              placeholder="Email"
              autoComplete="off"
              validate={handleValidateEmail}
            />
          </>,
          <>
            <Field
              type="text"
              name="fullname"
              style={{ margin: '10px 0px' }}
              component={FormSmileField}
              placeholder="Full Name"
              autoComplete="off"
            />
            <Field
              type="text"
              name="username"
              style={{ margin: '10px 0px' }}
              component={FormSmileField}
              placeholder="Username"
              autoComplete="off"
              validate={handleValidateUsername}
            />
            <Field
              type="password"
              name="password"
              style={{ margin: '10px 0px' }}
              component={FormSmileField}
              placeholder="password"
              autoComplete="off"
            />
          </>
        ];

        return (
          <div className={style.section}>
            <div className={style.flexCenter}>
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
                  <Logo
                    width={20}
                    className={loading || loading1 ? style.animatedSvg : ''}
                    style={{ marginRight: '10px' }}
                  />
                  Smile
                </span>
                {Page[stateActive]}
                <span>
                  {!(stateActive > 0) && switcher}
                  {!isValid && (
                    <span
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      {stateActive > 0 && (
                        <button
                          type="button"
                          onClick={() =>
                            setStateActive((state: number) => state - 1)
                          }
                          style={{
                            all: 'inherit',
                            fontSize: 'var(--font-size-small)',
                            fontWeight: 700,
                            cursor: 'pointer',
                            padding: 'var(--padding-small)',
                            width: 'max-content'
                          }}
                        >
                          Prev
                        </button>
                      )}
                      {stateActive < Page.length - 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setStateActive((state: number) => state + 1)
                          }
                          style={{
                            all: 'inherit',
                            fontSize: 'var(--font-size-small)',
                            fontWeight: 700,
                            cursor: 'pointer',
                            padding: 'var(--padding-small)',
                            width: 'max-content'
                          }}
                        >
                          Next
                        </button>
                      )}
                    </span>
                  )}
                </span>
                {isValid && (
                  <button
                    style={{
                      all: 'inherit',
                      fontSize: 'var(--font-size-default)',
                      cursor: 'pointer',
                      padding: 'var(--padding-small)'
                    }}
                    type="submit"
                  >
                    Register
                  </button>
                )}
              </Form>
            </div>
            <div
              className={style.flexCenter}
              style={{ backgroundColor: '#E1F3F5', flexDirection: 'column' }}
            >
              <span
                style={{
                  fontSize: 'var(--font-size-default)',
                  maxWidth: '80%'
                }}
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
        );
      }}
    />
  );
});
