const {
  Login,
  RegisterUser,
  isValid,
  getMe,
  inputPost,
  getUserByID,
  inputComment,
  getPost,
  getRatingByParentID,
  getPostByID,
  getCommentByParentID,
  setUser,
  setPost,
  setComment,
  removeByID,
  getContributor,
  getAllPostByAuthorID
} = require('../db/index');

module.exports = {
  Query: {
    me: async (_, __, _context) => {
      if (_context) {
        return null;
      }
      const { dataValues } = await getMe(_context.id);
      return dataValues;
    },
    posts: () => {
      const post = getPost();
      return post;
    },
    trending: () => {}
  },
  User: {
    post: (parent, _) => {
      return getAllPostByAuthorID(parent.user_id);
    }
  },
  Post: {
    author: (parent, _) => {
      const user = getUserByID(parent.author_id);
      return user;
    },
    rating: (parent, _) => {
      const rating = getRatingByParentID(parent.id);
      return rating;
    },
    comments: (parent, _) => {
      const comments = getCommentByParentID(parent.id);
      return comments;
    },
    contributor: (parent, _) => {
      const contrib = getContributor(parent.postId);
      return contrib;
    }
  },
  ContributorUser: {
    contributor: async (parent, _) => {
      const profil = await getUserByID(parent.user_id);
      return profil;
    }
  },
  Rating: {
    post: (parent, _) => {
      const post = getPostByID(parent.postId);
      return post;
    }
  },
  Comment: {
    commenter: async (parent, _) => {
      console.log(parent.userId);
      const user = await getUserByID(parent.userId);
      return user;
    },
    reply: (parent, _) => {
      if (parent.reply) {
        const reply = getCommentByParentID(parent.reply_for_id);
        return reply;
      }
      return null;
    }
  },
  Mutation: {
    daftar: async (_obj, { input }) => {
      return RegisterUser(input);
    },
    login: (_, { input: { username, password } }) => {
      return Login(username, password);
    },
    validation: (_, { username, email }, _context, _info) => {
      return isValid(username, email);
    },
    post: (_, { input }, _context) => {
      return inputPost(input, _context.id);
    },
    postcomment: (_, { input }, _context) => {
      return inputComment(input, _context.id);
    },
    EditUser: (_, { input }, _context) => {
      return setUser(input, _context.id);
    },
    EditPost: (_, { postId, input }, _context) => {
      return setPost(postId, input, _context.id);
    },
    EditComment: (_, { commentId, content }, _context) => {
      return setComment(commentId, content, _context.id);
    },
    RemoveByID: (_, { input }, _context) => removeByID(input, _context.id)
  }
};
