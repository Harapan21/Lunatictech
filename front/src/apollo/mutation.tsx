import gql from 'graphql-tag';

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!, $username: String!) {
    singleUpload(file: $file, username: $username) {
      path
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      login
      token
    }
  }
`;

export const DAFTAR = gql`
  mutation daftar(
    $username: String!
    $email: String!
    $fullname: String!
    $password: String!
    $avatar: String!
  ) {
    daftar(
      input: {
        username: $username
        email: $email
        fullname: $fullname
        password: $password
        avatar: $avatar
      }
    ) {
      token
      login
    }
  }
`;

export const EDIT_USER = gql`
  mutation EditUser($password: String!) {
    EditUser(input: { password: $password })
  }
`;

export const validationUsername = gql`
  mutation Validation($username: String) {
    validation(username: $username) {
      username
    }
  }
`;

export const validationEmail = gql`
  mutation Validation($email: String) {
    validation(email: $email) {
      email
    }
  }
`;
