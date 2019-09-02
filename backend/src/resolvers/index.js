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
    me: async (_, __, _context) => {
      if (!_context.id) {
        return null;
      }
      return getMe(_context.id);
    },
    posts: () => {
      return getPost();
    },
    trending: () => {}
  },
  User: {
    post: (parent, _) => {
      return getAllPostByAuthorID(parent.user_id);
    },
    firstLetter: ({ username }) => {
      return username[0];
    },
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
        if(file.includes(".jpg")) {
          files.push({location: `${staticUri}${parent.username}/${file}`})
        }
      });
      return files;
    }
  },
  Post: {
    author: ({ author_id }) => {
      return getUserByID(author_id);
    },
    rating: ({ id }) => {
      return getRatingByParentID(id);
    },
    comments: ({ id }) => {
      return getCommentByParentID(id);
    },
    contributor: ({ id }) => {
      return getContributor(id);
    },
    embed: ({ id }) => getEmbed(id)
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
    RemoveByID: (_, { input }, _context) => removeByID(input, _context.id),
    singleUpload: async (_, args) =>
      await proccessUpload(args.file, args.username)
  }
};
