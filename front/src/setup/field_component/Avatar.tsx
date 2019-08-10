import { FieldProps } from 'formik';
import * as React from 'react';
import style from '../../../public/style.scss';
import Upload from '../../../public/upload.svg';

export default function Avatar(props: InputPageProps<FieldProps<UserSetup>>) {
  const {
    field: { name, value },
    form: { handleBlur, setFieldValue, errors },
    label,
    type
  } = props;
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
    <div className={`${style.formLarge} ${style.upload}`}>
      <label>{label}</label>
      {value ? (
        <div className={style.avatar}>
          <img src={picture} />
        </div>
      ) : (
        <>
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
        </>
      )}
      {!errors[name] && (
        <button
          disabled={errors[name]}
          type="submit"
          className={style.buttonDefault}
        >
          finish
        </button>
      )}
    </div>
  );
}
