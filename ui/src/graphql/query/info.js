import { gql } from "apollo-boost";

export default gql`
  query info {
    info {
      name
      description
    }
  }
`;
