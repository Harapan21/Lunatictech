import { gql } from "apollo-boost";

export const POSTLIST = gql`
  query post_list {
    post {
      id
      title
      comment {
        content
        id
        createdAt
        reply {
          id
          content
          reply {
            id
            content
          }
          author {
            username
            isAdmin
            email
          }
        }
        author {
          id
          username
          email
        }
      }
    }
  }
`;
