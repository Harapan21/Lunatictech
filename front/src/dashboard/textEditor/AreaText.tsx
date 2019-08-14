import * as React from 'react';
import { FieldProps } from 'formik';
import ErrorBox from '../../ErrorBox';

export default ({
  field,
  form: { touched, errors },
  ...props
}: FieldProps<PostField>) => {
  return (
    <div style={{ height: '100%' }}>
      <textarea {...field} {...props} />
      {errors && (
        <div style={{ position: 'absolute', bottom: '10px', left: '8px' }}>
          {Object.keys(errors).map(
            (e: any, i: number) =>
              touched[e] && <ErrorBox key={i} errorMsg={errors[e]} />
          )}
        </div>
      )}
    </div>
  );
};
