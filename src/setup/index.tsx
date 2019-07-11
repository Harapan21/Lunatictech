import * as React from 'react';
import style from '../../public/style.scss';
import Started from '../../public/start.svg';
import {Formik, Field, Form} from 'formik';

const InputLarge = ({
  field,
  form: {touched, errors},
  ...props
}: FieldProps<UserSetup>) => {
  return (
    <div>
      <label>{props.label}</label>
      <input type={props.type} {...field} placeholder="type here" />
    </div>
  );
};

const Landing = ({onClick}: any) => {
  return (
    <>
      <h1>Make smile manage your content</h1>
      <Started />
      <button onClick={onClick} style={{all: 'unset', cursor: 'pointer'}}>
        <h2 style={{fontWeight: 500, color: 'var(--pink)'}}>Get Started</h2>
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
  const [stepIndex, setIndex] = React.useState(0);
  const handleState = () => {
    if (stepIndex > Page.length) {
      setIndex(0);
    }
    setIndex((state: number) => state + 1);
  };
  const Page: React.ReactNode[] = [
    <Landing key={0} onClick={() => handleState()} />,
    <Field key={1} label="What is your name?" components={InputLarge} />,
  ];
  const handleSetup = (changedState: UserSetup) => {
    setSetup(changedState);
  };
  return (
    <div className={style.setup}>
      <Formik
        initialValues={initialState}
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
