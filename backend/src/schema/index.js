const { gql } = require('apollo-server-express');
const typeDefs = gql`
  scalar Date
  type Query {
    me: User
    posts: [Post]
    trending: [Post]
    author: [User]
    category: [Category]
  }
  type File {
    id: String!
    path: String!
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type Mutation {
    daftar(input: UserField!): Auth!
    login(input: LoginUser!): Auth!
    postcomment(input: CommentField!): Boolean!
    post(input: PostField!): Boolean!
    EditUser(input: UserField!): Boolean!
    EditPost(postId: Int!, input: PostField!): EditPost!
    EditComment(commentId: Int!, content: String!): Boolean!
    RemoveByID(input: genericInput): Boolean!
    validation(username: String, email: String): Validation!
    singleUpload(file: Upload!, username: String!): File!
    category(input: CategoryField): Boolean!
  }
  input CategoryField {
    name: String!
    parentId: Int
  }

  input genericInput {
    id: ID!
    for: genericEnum!
  }

  enum genericEnum {
    user
    comment
    post
  }
  type Validation {
    username: Boolean
    email: Boolean
  }
  enum Status {
    publish
    draft
    hide
  }
  type EditPost {
    access: Boolean!
    success: Boolean!
  }
  type User {
    user_id: ID!
    username: String!
    email: String!
    joinAt: Date!
    lastEditedAt: Date!
    fullname: String!
    avatar: String
    isAdmin: Boolean
    post: [Post]
    firstLetter: String!
    drive: [Drive]
  }
  type Drive {
    location: String!
  }
  type Embed {
    id: Int!
    postId: Int!
    thumbnail: String
    video: String
  }

  type Rating {
    id: Int!
    post: Post!
    view: Int!
    share: Int!
    comment: Int!
    video_rate: Int
  }

  type ContributorUser {
    id: Int!
    contribAt: Date!
    contributor: User!
  }

  type Comment {
    id: Int!
    postId: Int!
    commenter: User!
    createdAt: Date!
    content: String!
    reply: [Comment]
  }
  interface Category {
    id: Int!
    name: String!
    post: [Post]
  }
  type CategoryList implements Category {
    id: Int!
    name: String!
    post: [Post]
    parent: CategoryList
  }
  type CategoryTree implements Category {
    id: Int!
    name: String!
    post: [Post]
    child: CategoryTree
  }
  type Post {
    id: Int!
    author: User!
    title: String!
    createdAt: Date!
    content: String!
    status: Status!
    last_edited_at: Date
    last_edited_by: String
    embed: Embed!
    rating: Rating!
    contributor: [ContributorUser]
    comments: [Comment]
    category: [Category]
  }
  input UserField {
    username: String
    email: String
    fullname: String
    password: String
    avatar: String
  }

  input LoginUser {
    username: String!
    password: String!
  }

  type Auth {
    login: Boolean!
    token: String
  }
  input CommentField {
    postId: Int!
    content: String!
    reply_for_id: Int
  }
  input PostField {
    title: String!
    content: String!
    status: Status!
    category: [Int]!
  }
`;
module.exports = typeDefs;
