import * as React from 'react';
import { Formik, Form, Field, FormikProps } from 'formik';
import FormSmileField from '../components/FormSmileField';
import style from '../../public/style.scss';
import Logo from '../../public/Smile.svg';
import * as Yup from 'yup';
import Quotes from '../components/Quotes';
import { LOGIN } from '../apollo/mutation';
import { useMutation } from '@apollo/react-hooks';

export default ({ switcher }: RegisterProps) => {
  const { quote, author } = Quotes();
  return (
    <Formik
      validationSchema={Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string()
          .matches(/^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
          .min(8)
          .required('Password is required!'),
        email: Yup.string()
          .email()
          .required()
      })}
      initialValues={{
        username: '',
        password: '',
        email: '',
        fullname: '',
        avatar: ''
      }}
      onSubmit={(values: RegisterFormValues) => console.log(values)}
      render={({ touched, errors }: FormikProps<RegisterFormValues>) => {
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
                  <Logo width={20} style={{ marginRight: '10px' }} />
                  Smile
                </span>
                <Field
                  type="text"
                  name="username"
                  style={{ margin: '10px 0px' }}
                  component={FormSmileField}
                  placeholder="username"
                />
                {touched.username && !errors.username && (
                  <Field
                    type="password"
                    name="password"
                    style={{ margin: '10px 0px' }}
                    component={FormSmileField}
                    placeholder="password"
                  />
                )}
                {switcher}
                <button
                  style={{
                    all: 'inherit',
                    fontSize: 'var(--font-size-default)',
                    cursor: 'pointer',
                    padding: 'var(--padding-small)'
                  }}
                  type="submit"
                >
                  Login
                </button>
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
};
