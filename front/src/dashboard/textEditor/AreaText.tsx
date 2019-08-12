import * as React from 'react';

export default ({ field, form, ...props }) => {
  return <textarea {...field} {...props} />;
};
