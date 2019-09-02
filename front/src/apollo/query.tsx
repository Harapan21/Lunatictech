import gql from 'graphql-tag';

export const GET_USER = gql`
  query User {
    me {
      user_id
      avatar
      joinAt
      username
      firstLetter
      fullname
      drive {
        location
      }
    }
  }
`;
