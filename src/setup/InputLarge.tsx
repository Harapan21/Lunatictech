import * as React from 'react';
import { FieldProps } from 'formik';
import style from '../../public/style.scss';
import ErrorBox from '../ErrorBox';

export default function InputLarge(
  props: InputPageProps<FieldProps<UserSetup>>
) {
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
}
