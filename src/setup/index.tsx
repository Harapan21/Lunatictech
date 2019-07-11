import * as React from 'react';
import style from '../../public/style.scss';
import Started from '../../public/start.svg';
import {Formik, Field, Form} from 'formik';
import * as Yup from 'yup';

const InputLarge = ({
  field,
  form: {touched, errors},
  ...props
}: FieldProps<UserSetup>) => {
  const isOverflow = field.value ? (field.value.length > 15 ? true : false) : 0;
  console.log(field);
  return (
    <div className={`${style.formLarge} ${isOverflow ? style.overflow : ''}`}>
      <label>{props.label}</label>
      <input
        maxLength={35}
        type={props.type}
        {...field}
        placeholder="type here"
      />
      <button
        onClick={props.onClick}
        type="button"
        className={style.buttonDefault}
      >
        next
      </button>
    </div>
  );
};

const Landing = ({onClick}: any) => {
  return (
    <>
      <h1>Make smile manage your content</h1>
      <Started />
      <button onClick={onClick} type="button" className={style.buttonDefault}>
        Get Started
      </button>
    </>
  );
};

export default () => {
  const {initialState, setSetup} = React.useState({
    fullName: '',
    userName: '',
    emailAddress: '',
    passwordUsr: '',
    avatar: '',
  });
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
  return (
    <div className={style.setup}>
      <Formik
        initialValues={initialState}
        validationSchema={userSetupSchema}
        onSubmit={(values: UserSetup) => {
          alert(JSON.stringfy(values));
        }}
        render={(formikBag: FormikProps<UserSetup>) => (
          <Form style={{all: 'inherit'}} id="setupForm">
            {(() => {
              const handleState = () => {
                if (stepIndex > Page.length) {
                  setIndex(0);
                }
                setIndex((state: number) => state + 1);
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
                  key={1}
                  type="text"
                  name="userName"
                  label="Enter Your Username"
                  onClick={() => handleState()}
                  component={InputLarge}
                />,
              ];
              return Page[stepIndex];
            })()}
          </Form>
        )}
      />
    </div>
  );
};
