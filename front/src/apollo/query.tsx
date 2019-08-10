import gql from 'graphql-tag';

export const MANU_ACTIVE = gql`
  {
    MenuToggle @client
  }
`;

export const IS_POST_TOGGLE = gql`
  {
    toggled @client
  }
`;
