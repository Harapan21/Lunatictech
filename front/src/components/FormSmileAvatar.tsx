import * as React from 'react';
import { FieldProps } from 'formik';
import Upload from '../../public/upload.svg';
import style from '../../public/style.scss';
const FormSmileAvatar = ({
  field: { name, value },
  form: { handleBlur, setFieldValue, errors },
  type
}: FieldProps & any) => {
  const [picture, setPicture] = React.useState('');

  const uploadAvatar = () => {
    const file = new FileReader();
    file.onload = (e: any) => {
      setPicture(e.target.result);
    };
    file.readAsDataURL(value);
  };
  React.useEffect(() => {
    if (value) {
      uploadAvatar();
    }
  }, [value]);
  return (
    <>
      {value ? (
        <div className={style.avatarview}>
          <div className={style.roundedRelative}>
            <img src={picture} />
          </div>
        </div>
      ) : (
        <div className={style.upload}>
          <Upload />
          <input
            name={name}
            type={type}
            onBlur={handleBlur}
            onChange={({
              target: {
                validity,
                files: [file]
              }
            }: any) => {
              return validity.valid && setFieldValue('avatar', file);
            }}
          />
        </div>
      )}
    </>
  );
};
export default FormSmileAvatar;
