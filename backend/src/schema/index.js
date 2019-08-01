const { gql } = require('apollo-server');
const typeDefs = gql`
    scalar Date
    type Query {
        me: User
        post: [Post]
        trending: [Post]
        author: [User]
    }
    type Mutation {
        daftar(input: UserField!): Auth!
        login(input: LoginUser!): Auth!
        Comment(input: CommentField!): Boolean!
        Post(input: PostField!): Boolean!
        EditUser(Input: UserField!): User!
        EditPost(input: PostField!): Post!
        EditComment(input: EditCommentField!): Boolean
        RemoveByID(input: genericInput): Boolean
        FindByID(input: genericInput): Boolean
    }

    enum Status {
        publish
        draft
        hide
    }
    type User {
        user_id: ID!
        username: String!
        joinAt: Date!
        lastEditedAt: Date!
        fullname: String!
        password: String!
        avatar: String!
        isAdmin: Boolean
        post: [Post]
    }

    type Embed {
        id: Int!
        postId: Int!
        thumbnail: Int
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
        comment: [Comment]
    }
    input UserField {
        username: String!
        email: String!
        fullname: String!
        password: String!
        avatar: String!
    }

    input LoginUser {
        username: String!
        password: String!
    }

    type Auth {
        login: Boolean!
        token: String!
    }
    input CommentField {
        postId: Int!
        content: String!
        user_id: ID!
        reply_id: Int
    }
    input PostField {
        author_id: ID!
        title: String!
        content: String!
        status: Status!
    }

    input EditCommentField {
        id: Int!
        content: String!
    }

    enum genericEnum {
        user
        comment
        post
    }

    input genericInput {
        id: ID!
        for: genericEnum!
    }

`
module.exports = typeDefs;