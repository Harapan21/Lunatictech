import * as React from 'react';
import {Formik, Form, FormikProps, Field} from 'formik';
import Title from './Title';
import Toolbar from './Toolbar';
import Content from './Content';
import Modal from './Modal';
import * as Yup from 'yup';
const TextEditor: React.SFC<TextEditorProps> = React.memo(({user}) => {
  const [isModal, setModalToggle] = React.useState(false);
  const handleToggle = React.useCallback(() => {
    setModalToggle((state: boolean) => !state);
  }, []);
  return (
    <Formik
      initialValues={{
        title: '',
        content: '',
        status: 'draft',
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required(),
        content: Yup.string().required(),
        status: Yup.string().required(),
      })}
      onSubmit={(values: TextEditorFormProps) => alert(values)}
      render={(props: FormikProps<TextEditorFormProps>) => {
        return (
          <Form
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              position: 'relative',
              flexDirection: 'column',
            }}
          >
            <Title>
              <Field
                component="select"
                name="status"
                style={{
                  all: 'unset',
                  fontSize: 'var(--font-size-medium)',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <option value="draft">Draft</option>
                <option value="hidden">Hidden</option>
                <option value="publish">Publish</option>
              </Field>
            </Title>
            <Content>
              <Toolbar setToggle={handleToggle} user={user} />
            </Content>
            {isModal && <Modal setToggle={handleToggle} user={user} />}
          </Form>
        );
      }}
    />
  );
});

export default TextEditor;
