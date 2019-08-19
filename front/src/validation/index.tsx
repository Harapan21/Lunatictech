import * as Yup from 'yup';

const ValidationMessage = {
  email: 'Must be email example: john@smile.me',
  required: 'cannot be empty',
  password: 'Weak'
};

export const LoginValidation = () =>
  Yup.object().shape({
    userName: Yup.string().required(ValidationMessage.required),
    passwordUsr: Yup.string()
      .required(ValidationMessage.required)
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        ValidationMessage.password
      )
  });

export default () =>
  Yup.object().shape({
    fullName: Yup.string().required(ValidationMessage.required),
    userName: Yup.string().required(ValidationMessage.required),
    emailAddress: Yup.string()
      .email(ValidationMessage.email)
      .required(ValidationMessage.required),
    passwordUsr: Yup.string()
      .required(ValidationMessage.required)
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        ValidationMessage.password
      ),
    avatar: Yup.string().required(ValidationMessage.required)
  });
