import { FieldProps } from 'formik';
import * as React from 'react';
import style from '../../../public/style.scss';
import ErrorBox from '../../ErrorBox';
import Hide from '../../../public/hide.svg';
import Show from '../../../public/view.svg';

export default function InputLarge<T>(props: InputPageProps<FieldProps<T>>) {
  const { field, form, label, onClick, type, ...rest } = props;
  const isOverflow: boolean = field.value.length > 15;
  const [passwordShow, setPasswordShow] = React.useState(false);
  const isPassword = type === 'password';
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
          style={{ margin: '0px' }}
          onClick={() => setPasswordShow((isShow: boolean) => !isShow)}
        >
          {passwordShow ? (
            <Hide className={style.password} />
          ) : (
            <Show className={style.password} />
          )}
        </button>
      )}
      {form.isValid ? (
        <button
          disabled={
            (form.touched[field.name] && form.errors[field.name]) ||
            !form.touched[field.name]
          }
          type="submit"
          className={style.buttonDefault}
        >
          finish
        </button>
      ) : (
        <button
          disabled={
            (form.touched[field.name] && form.errors[field.name]) ||
            !form.touched[field.name]
          }
          onClick={onClick}
          type="button"
          className={style.buttonDefault}
        >
          next
        </button>
      )}
    </div>
  );
}
