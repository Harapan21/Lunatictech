import * as React from 'react';
import { FieldProps } from 'formik';
import style from '../../public/style.scss';
// import ErrorBox from '../ErrorBox';

import Upload from '../../public/upload.svg';

export default function Avatar(props: InputPageProps<FieldProps<UserSetup>>) {
  const {
    field: { name, value },
    form,
    label,
    type
  } = props;
  const { handleBlur, setFieldValue } = form;

  return (
    <div className={`${style.formLarge} ${style.upload}`}>
      <label>{label}</label>
      {value != null && (
        <div className={style.avatar}>
          <img src={value} />
        </div>
      )}
      {value === null && (
        <>
          <Upload />
          <input
            name={name}
            type={type}
            onBlur={handleBlur}
            onChange={(e: any) => {
              const reader = new FileReader();
              reader.onload = (r: any) => {
                setFieldValue('avatar', r.target.result);
              };
              reader.readAsDataURL(e.target.files[0]);
            }}
          />
        </>
      )}
    </div>
  );
}
