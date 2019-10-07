import * as React from 'react';
import { Formik, Form, FormikProps, Field } from 'formik';
import Title from './Title';
import Toolbar from './Toolbar';
import Content from './Content';
import Modal from './Modal';
import * as Yup from 'yup';
import Plus from '../../../public/plus.svg';
import { useQuery } from '@apollo/react-hooks';
import { GET_CATEGORY } from '../../apollo/query';
import Loading from '../../components/Loading';

const CategoryList: React.SFC = () => {
  const getCatgory = React.useCallback(() => useQuery(GET_CATEGORY), []);
  const { data, loading } = getCatgory();
  const [CategoryList, setCategoryList] = React.useState([]);
  const [isActive, setActive] = React.useState(false);
  const [typed, setTyped] = React.useState({ word: '', isType: false });
  const handleChange = React.useCallback(
    (e: any) => {
      setTyped({ word: e.target.value, isType: e.target.value.length > 0 });
    },
    [typed, setTyped]
  );
  const handleClick = React.useCallback(
    () => setActive((state: boolean) => !state),
    [isActive, setActive]
  );
  React.useEffect(() => {
    if (!loading && data && data.category) {
      setCategoryList(data.category);
    }
  }, [loading]);
  const handleSearch = React.useCallback(
    () =>
      typed.isType
        ? CategoryList.filter((e: any) => e.name.includes(typed.word))
        : CategoryList,
    [typed, CategoryList]
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding: 10,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 9999
      }}
    >
      {isActive && (
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            background: 'var(--white)',
            padding: 0,
            width: 500,
            borderRadius: 10,
            boxShadow: 'var(--shadow-md)'
          }}
        >
          {handleSearch().map(({ name, id }) => (
            <li
              key={id}
              style={{
                fontSize: 'var(--font-size-medium)',
                cursor: 'pointer',
                padding: '15px 10px'
              }}
            >
              {name}
            </li>
          ))}
          <li
            style={{
              fontSize: 'var(--font-size-medium)',
              width: '100%'
            }}
          >
            <input
              onChange={handleChange}
              placeholder="Search Category"
              style={{
                border: 0,
                padding: 10,
                background: 'inherit',
                width: '100%',
                opacity: typed.isType ? 1 : 0.6,
                boxSizing: 'border-box'
              }}
            />
          </li>
        </ul>
      )}
      <button
        style={{
          margin: '5px 0px',
          padding: 10,
          width: 'max-content',
          border: 0,
          background: 'var(--white)',
          height: 30,
          borderRadius: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: 'var(--shadow-md)',
          cursor: 'pointer'
        }}
        onClick={() => handleClick()}
      >
        Category
      </button>
    </div>
  );
};

const TextEditor: React.SFC<TextEditorProps> = React.memo(({ user }) => {
  const [isModal, setModalToggle] = React.useState(false);
  const handleToggle = React.useCallback(() => {
    setModalToggle((state: boolean) => !state);
  }, []);
  return (
    <Formik
      initialValues={{
        title: '',
        content: '',
        status: 'draft'
      }}
      validationSchema={Yup.object().shape({
        title: Yup.string().required(),
        content: Yup.string().required(),
        status: Yup.string().required()
      })}
      onSubmit={(values: TextEditorFormProps) => console.log(values)}
      render={(props: FormikProps<TextEditorFormProps>) => {
        return (
          <Form
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              position: 'relative',
              flexDirection: 'column'
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
                  textAlign: 'center'
                }}
              >
                <option value="draft">Draft</option>
                <option value="hidden">Hidden</option>
                <option value="publish">Publish</option>
              </Field>
            </Title>
            <Content CategoryList={CategoryList}>
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
