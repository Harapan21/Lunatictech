import * as React from 'react';
import style from '../../public/style.scss';
import Started from '../../public/start.svg';
import { Formik, Field, Form, FormikProps, FieldProps } from 'formik';
import * as Yup from 'yup';
import ErrorBox from '../ErrorBox';
import Upload from '../../public/upload.svg';

const Landing = ({ onClick }: any) => (
  <>
    <h1>Make smile manage your content</h1>
    <Started />
    <button onClick={onClick} type="button" className={style.buttonDefault}>
      Get Started
    </button>
  </>
);

export default () => {
  const initialValues = {
    fullName: '',
    userName: '',
    emailAddress: '',
    passwordUsr: '',
    avatar: null
  };
  const ValidationMessage = {
    email: 'Must be email example: john@smile.me',
    required: 'cannot be empty',
    password: 'Weak'
  };
  const userSetupSchema = Yup.object().shape({
    fullName: Yup.string().required(ValidationMessage.required),
    userName: Yup.string().required(ValidationMessage.required),
    emailAddress: Yup.string()
      .email(ValidationMessage.email)
      .required(ValidationMessage.required),
    passwordUsr: Yup.string()
      .required(ValidationMessage.required)
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        ValidationMessage.password
      ),
    avatar: Yup.string().required(ValidationMessage.required)
  });
  const [stepIndex, setIndex] = React.useState(0);
  const [passwordShow, setPasswordShow] = React.useState(false);
  const Page: React.ReactNode[] = [
    <Landing key={0} onClick={() => handleState()} />,
    <Field
      key={1}
      type="text"
      name="fullName"
      label="Enter Your Name"
      component={InputLarge}
      onClick={() => handleState()}
    />,
    <Field
      key={2}
      type="text"
      name="userName"
      label="Enter Your Username"
      onClick={() => handleState()}
      component={InputLarge}
    />,
    <Field
      key={2}
      type="text"
      name="emailAddress"
      label="Enter Your Email"
      onClick={() => handleState()}
      component={InputLarge}
    />,
    <Field
      key={3}
      type="password"
      passwordShow={passwordShow}
      setPasswordShow={setPasswordShow}
      name="passwordUsr"
      label="Enter Your Password"
      onClick={() => handleState()}
      component={InputLarge}
    />,
    <Field
      key={4}
      type="file"
      name="avatar"
      label="Upload your avatar"
      component={Avatar}
    />
  ];
  const handleState = () => {
    if (stepIndex === Page.length - 1) {
      setIndex(0);
    } else {
      setIndex((state: number) => state + 1);
    }
  };

  return (
    <div className={style.setup}>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={userSetupSchema}
        onSubmit={(values: UserSetup) => {
          alert(JSON.stringify(values));
        }}
        render={(formikBag: FormikProps<UserSetup>) => {
          console.log(formikBag.values);
          return (
            <Form style={{ all: 'inherit' }} id="setupForm">
              {Page[stepIndex]}
            </Form>
          );
        }}
      />
    </div>
  );
};

const Avatar = (props: InputPageProps<FieldProps<UserSetup>>) => {
  const {
    field: { name },
    form,
    label,
    type
  } = props;
  const { handleBlur, setFieldValue } = form;
  //  const Image = ({name}: any)=> {
  //  <div>
  //    <img src={url}/>
  //  </div>
  // }
  return (
    <div className={`${style.formLarge} ${style.upload}`}>
      <label>{label}</label>
      <Upload />
      <input
        name={name}
        type={type}
        onBlur={handleBlur}
        onChange={(e: any) => setFieldValue('avatar', e.currentTarget.files[0])}
      />
    </div>
  );
};
const InputLarge = (props: InputPageProps<FieldProps<UserSetup>>) => {
  const {
    field,
    form,
    label,
    onClick,
    passwordShow,
    setPasswordShow,
    type,
    ...rest
  } = props;
  const isOverflow: boolean = field.value.length > 15;
  const isPassword = type === 'password';
  // idiotmatic
  const checkIsPassword = isPassword ? (passwordShow ? 'text' : type) : type;
  return (
    <div className={`${style.formLarge} ${isOverflow ? style.overflow : ''}`}>
      <label>{label}</label>
      <input
        type={checkIsPassword}
        maxLength={35}
        {...field}
        {...rest}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        placeholder="type here"
      />
      {form.touched[field.name] && form.errors[field.name] && (
        <ErrorBox errorMsg={form.errors[field.name]} />
      )}
      {form.touched[field.name] && isPassword && (
        <button
          type="button"
          className={style.buttonDefault}
          onClick={() => setPasswordShow((state: boolean) => !state)}
        >
          {passwordShow ? 'hide' : 'show'}
        </button>
      )}
      <button
        disabled={form.touched[field.name] && form.errors[field.name]}
        onClick={onClick}
        type="button"
        className={style.buttonDefault}
      >
        next
      </button>
    </div>
  );
};
