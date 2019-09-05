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
  getAllPostByAuthorID,
  getPostByCategoryId,
  getCategoryByPostId,
  getEmbed
} = require('../db/index');

const mkdirp = require('mkdirp');
const fs = require('fs');
const UPLOAD_DIR = './uploads';
mkdirp.sync(UPLOAD_DIR);
const shortid = require('shortid');
const staticUri = 'http://localhost:4000/static/';

const storeFS = ({ stream, filename }, username) => {
  const UPLOAD_DIR_ID = `${UPLOAD_DIR}/${username}`;
  mkdirp.sync(UPLOAD_DIR_ID);
  const id = shortid.generate();
  const path = `${id}-${filename}`;
  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated)
          // Delete the truncated file.
          fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(`${UPLOAD_DIR_ID}/${path}`))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ id, path }))
  );
};
const proccessUpload = async (file, user_id) => {
  const { createReadStream, filename, mimetype, encoding } = await file;

  const stream = createReadStream();
  const { id, path } = await storeFS({ stream, filename }, user_id);
  return { id, path, filename, mimetype, encoding };
};

module.exports = {
  Query: {
    me: (_, __, _context) => {
      if (!_context.id) {
        return null;
      }
      return getMe(_context.id);
    },
    posts: () => getPost(),
    trending: () => {}
  },
  User: {
    post: (parent, _) => getAllPostByAuthorID(parent.user_id),
    firstLetter: ({ username }) => username[0],
    avatar: (parent, _) => {
      const MyFile = `${parent.username}/${parent.avatar}`;
      const isAvatarExist = fs.existsSync(`${UPLOAD_DIR}/${MyFile}`);
      if (!isAvatarExist) {
        return null;
      }
      return `${staticUri}${MyFile}`;
    },
    drive: (parent, _) => {
      const files = [];
      fs.readdirSync(`${UPLOAD_DIR}/${parent.username}`).map(file => {
        if (/\.(gif|jpe?g|tiff|png)$/i.test(file)) {
          files.push({ location: `${staticUri}${parent.username}/${file}` });
        }
      });
      return files;
    }
  },
  Post: {
    author: ({ author_id }) => getUserByID(author_id),
    rating: ({ id }) => getRatingByParentID(id),
    comments: ({ id }) => getCommentByParentID(id),
    contributor: ({ id }) => getContributor(id),
    embed: ({ id }) => getEmbed(id),
    category: ({ id }) => getCategoryByPostId(id)
  },
  ContributorUser: {
    contributor: (parent, _) => getUserByID(parent.user_id)
  },
  Category: {
    post: (parent, _) => getPostByCategoryId(parent.id)
  },
  Rating: {
    post: (parent, _) => getPostByID(parent.postId)
  },
  Comment: {
    commenter: async (parent, _) => getUserByID(parent.userId),
    reply: (parent, _) => {
      if (parent.reply) {
        const reply = getCommentByParentID(parent.reply_for_id);
        return reply;
      }
      return null;
    }
  },
  Mutation: {
    daftar: (_obj, { input }) => RegisterUser(input),
    login: (_, { input: { username, password } }) => Login(username, password),
    validation: (_, { username, email }, _context, _info) =>
      isValid(username, email),
    post: (_, { input }, _context) => inputPost(input, _context.id),
    postcomment: (_, { input }, _context) => inputComment(input, _context.id),
    EditUser: (_, { input }, _context) => setUser(input, _context.id),
    EditPost: (_, { postId, input }, _context) =>
      setPost(postId, input, _context.id),
    EditComment: (_, { commentId, content }, _context) =>
      setComment(commentId, content, _context.id),
    RemoveByID: (_, { input }, _context) => removeByID(input, _context.id),
    singleUpload: (_, args) => proccessUpload(args.file, args.username)
  }
};
