import { FieldProps } from 'formik';
import * as React from 'react';
import style from '../../public/style.scss';
import Upload from '../../public/upload.svg';
import gql from 'graphql-tag';

export const UPLOAD_FILE = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      id
      path
      filename
      mimetype
      encoding
    }
  }
`;

export default function Avatar(props: InputPageProps<FieldProps<UserSetup>>) {
  const {
    field: { name, value },
    form: { handleBlur, handleChange },
    label,
    type
  } = props;

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
            onChange={handleChange}
          />
        </>
      )}
    </div>
  );
}
