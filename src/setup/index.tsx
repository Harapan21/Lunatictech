import * as React from 'react';
import style from '../../public/style.scss';
import Started from '../../public/start.svg';
import {Formik, Field, Form} from 'formik';
import * as Yup from 'yup';
import ErrorBox from '../ErrorBox.tsx';
const Landing = ({onClick}: any) => (
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
    avatar: '',
  };
  const userSetupSchema = Yup.object().shape({
    fullName: Yup.string().required(),
    userName: Yup.string().required(),
    emailAddress: Yup.string()
      .email()
      .required(),
    passwordUsr: Yup.string()
      .required()
      .matches(
        '^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$',
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
      ),
    avatar: Yup.string().required(),
  });
  const [stepIndex, setIndex] = React.useState(0);
  const handleSetup = (changedState: UserSetup) => {
    setSetup(changedState);
  };
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
      key={3}
      type="password"
      name="passwordUsr"
      label="Enter Your Password"
      onClick={() => handleState()}
      component={InputLarge}
    />,
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
        initialValues={...initialValues}
        validationSchema={userSetupSchema}
        onSubmit={(values: UserSetup) => {
          alert(JSON.stringfy(values));
        }}
        render={(formikBag: FormikProps<UserSetup>) => (
          <Form style={{all: 'inherit'}} id="setupForm">
            {Page[stepIndex]}
          </Form>
        )}
      />
    </div>
  );
};
const InputLarge = ({
  form: {touched, errors},
  field,
  label,
  onClick,
  ...props
}: FieldProps<UserSetup>) => {
  const isOverflow: boolean = field.value.length > 15;
  console.log(errors[field.name]);
  return (
    <div className={`${style.formLarge} ${isOverflow ? style.overflow : ''}`}>
      <label>{label}</label>
      <input maxLength={35} {...field} {...props} placeholder="type here" />
      {touched[field.name] && errors[field.name] && (
        <ErrorBox errorMsg={errors[field.name]} />
      )}
      <button
        disabled={errors[field.name]}
        onClick={onClick}
        type="button"
        className={style.buttonDefault}
      >
        next
      </button>
    </div>
  );
};
