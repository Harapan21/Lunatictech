import * as React from 'react';
import { FieldProps } from 'formik';
import View from '../../public/view.svg';
import UnView from '../../public/hide.svg';
const FormSmileField = ({
  field,
  form: { touched, errors },
  style,
  type,
  ...props
}: FieldProps & FormSmileFieldProps) => {
  const [view, setView] = React.useState(false);
  const inputEl = React.useRef(null);
  const isPassword = type === 'password';
  return (
    <>
      <div
        style={{
          position: 'relative',
          margin: '10px 0px'
        }}
      >
        <input
          ref={inputEl}
          type={isPassword ? (view ? 'text' : 'password') : 'text'}
          {...props}
          {...field}
          style={{
            borderRadius: '5px',
            width: '100%',
            padding: 'var(--padding-small)',
            margin: 0,
            boxSizing: 'border-box',
            border:
              touched[field.name] && errors[field.name]
                ? '1px solid var(--pink)'
                : '1px solid #ececec',
            fontSize: 'var(--font-size-default)',
            boxShadow: 'var(--shadow-md)',
            ...style
          }}
        />
        {isPassword && (
          <button
            type="button"
            style={{
              all: 'unset',
              cursor: 'pointer',
              position: 'absolute',
              bottom: '0px',
              top: '0px',
              right: '0px'
            }}
            onClick={() => setView((state: boolean) => !state)}
          >
            {!view ? <View width={20} /> : <UnView width={20} />}
          </button>
        )}
      </div>
      {touched[field.name] && errors[field.name] && (
        <span
          style={{
            all: 'unset',
            userSelect: 'none',
            color: 'var(--pink)',
            fontSize: 'var(--font-size-small)',
            textTransform: 'capitalize'
          }}
        >
          {errors[field.name]}
        </span>
      )}
    </>
  );
};

export default React.memo(FormSmileField);
