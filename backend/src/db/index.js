const fs = require('fs');
// handle database
// doc : https://sequelize.org/master/
const Sequelize = require('sequelize');

// jwt
// import json web token
// doc : https://www.npmjs.com/package/jsonwebtoken
const jwt = require('jsonwebtoken');
const privateKEY = fs.readFileSync(__dirname + '/key/private.key', 'utf8');
const publicKEY = fs.readFileSync(__dirname + '/key/public.key', 'utf8');
const signOption = {
  expiresIn: '1d',
  algorithm: 'RS256'
};
// /jwt

//db
const sequelize = new Sequelize('smile', 'root', 'Smile:)00', {
  host: 'localhost',
  dialect: 'mysql'
});

// models
const Comment = sequelize.import('./models/comment');
const ContributorUser = sequelize.import('./models/contributor_user');
const Embed = sequelize.import('./models/embed');
const Post = sequelize.import('./models/post');
const Rating = sequelize.import('./models/rating');
const User = sequelize.import('./models/usr_smile');
const Category = sequelize.import('./models/category');
const Category_Node = sequelize.import('./models/category_node');
// bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function getPostByCategoryId(categoryId) {
  Category_Node.belongsTo(Post);
  try {
    const postsArr = [];
    const posts = await Category_Node.findAll({
      where: {
        categoryId
      },
      include: [{ model: Post }],
      attributes: []
    });
    posts.map(({ post }) => {
      postsArr.push(post);
    });
    return postsArr;
  } catch (e) {
    console.log(e);
  }
}

async function getCategoryByPostId(postId) {
  Category_Node.belongsTo(Category);
  try {
    const categoryArr = [];
    const category_node = await Category_Node.findAll({
      where: {
        postId
      },
      include: [{ model: Category }],
      attributes: []
    });
    category_node.map(({ category }) => {
      categoryArr.push(category);
    });
    return categoryArr;
  } catch (e) {
    console.log(e);
  }
}

async function getCategoryByPostId(postId) {
  Category_Node.belongsTo(Category);
  try {
    const categoryArr = [];
    const category_node = await Category_Node.findAll({
      where: {
        postId
      },
      include: [{ model: Category }],
      attributes: []
    });
    category_node.map(({ category }) => {
      categoryArr.push(category);
    });
    return categoryArr;
  } catch (e) {
    console.log(e);
  }
}

function HashPass(pass) {
  return bcrypt.hash(pass, saltRounds).then(pass => pass);
}
function isVerify(field_password, password) {
  return bcrypt.compare(field_password, password).then(result => result);
}
async function RegisterUser({ username, password, ...rest }) {
  const bcryptPass = await HashPass(password);
  const user = await User.create(
    {
      username,
      password: bcryptPass,
      ...rest
    },
    {
      validation: true,
      fields: ['username', 'email', 'fullname', 'password', 'avatar']
    }
  );
  if (!user) {
    return {
      login: false,
      token: null
    };
  }
  return Login(username, password);
}

async function isValid(usernameField, emailField) {
  const isUsername =
    usernameField != undefined
      ? await User.findAndCountAll({ where: { username: usernameField } }).then(
          ({ count }) => count > 0
        )
      : false;
  const isEmail =
    emailField != undefined
      ? await User.findAndCountAll({ where: { email: emailField } }).then(
          ({ count }) => count > 0
        )
      : false;

  return {
    username: isUsername,
    email: isEmail
  };
}

async function getMe(id) {
  const user = await getUserByID(id);
  const post = await Post.findAll({
    where: {
      author_id: id
    }
  });
  const { password, ...userData } = user.dataValues;
  const me = {
    ...userData,
    post: [...post]
  };
  return me;
}

async function getPostByID(id) {
  const { dataValues } = await Post.findOne({
    where: {
      id
    }
  });
  return dataValues;
}
async function getAllPostByAuthorID(author_id) {
  const posts = await Post.findAll({
    where: {
      author_id
    }
  });
  return posts;
}
async function getPost() {
  return await Post.findAll();
}

async function getUserByID(id) {
  const user = await User.findOne({
    where: {
      user_id: id
    }
  });
  return user;
}

async function getRatingByParentID(postId) {
  const { dataValues } = await Rating.findOne({
    where: {
      postId
    }
  });
  return dataValues;
}

async function getCommentByParentID(id) {
  const comments = await Comment.findAll({
    where: {
      postId: id
    }
  });
  return comments;
}

async function Login(username, field_password) {
  const { user_id, password } = await User.findOne({
    where: {
      username
    }
  });
  const verify = await isVerify(field_password, password);
  if (!user_id || user_id === undefined || !verify) {
    return {
      login: false,
      token: null
    };
  }
  const auth = Auth(user_id);
  return auth;
}

function Auth(id) {
  const token = jwt.sign({ id }, privateKEY, signOption);

  const auth = {
    login: true,
    token
  };
  return auth;
}

function VerifyAuth(token) {
  const parse = jwt.verify(token, publicKEY, (err, decoded) => {
    if (!err) {
      return decoded;
    }
    return;
  });
  return parse;
}

function inputPost(post, id) {
  return Post.create({
    author_id: id,
    ...post
  }).then(() => {
    return true;
  });
}

function inputComment(comment, userId) {
  return Comment.create({
    ...comment,
    userId
  }).then(() => {
    return true;
  });
}

async function setUser(input, id) {
  if (input.password) {
    const hash = await HashPass(input.password);
    input.password = hash;
  }
  return User.update(
    {
      ...input
    },
    {
      where: {
        user_id: id
      }
    }
  ).then(() => true);
}

async function setPost(postId, input, authId) {
  const { author_id } = await getPostByID(postId);
  if (authId != author_id) {
    return {
      access: false,
      success: true
    };
  } else {
    return Post.update(
      {
        ...input,
        last_edited_by: authId
      },
      {
        where: {
          id: postId
        }
      }
    ).then(() => ({
      access: true,
      success: true
    }));
  }
}

async function getCommentByID(id) {
  const comments = await Comment.findOne({
    where: {
      id
    }
  });
  return comments;
}
async function setComment(commentId, content, id) {
  const { userId } = await getCommentByID(commentId);
  if (userId !== id) {
    return false;
  }
  return Comment.update(
    {
      content
    },
    {
      where: {
        id: commentId
      }
    }
  ).then(() => true);
}

async function removeByID(input, authId) {
  switch (input.for) {
    case 'user':
      if (input.id === authId) {
        return User.destroy({
          where: {
            user_id: input.id
          }
        }).then(() => true);
      }
      return false;
    case 'comment':
      const { userId } = await getCommentByID(input.id);
      if (userId === authId) {
        return Comment.destroy({
          where: {
            id: input.id
          }
        }).then(() => true);
      }
      return false;
    case 'post':
      const { author_id } = await getPostByID(input.id);
      if (author_id === authId) {
        return Post.destroy({
          where: {
            id: input.id
          }
        }).then(() => true);
      }
      return false;
    default:
      return false;
  }
}

async function getContributor(postId) {
  return await ContributorUser.findAll({
    where: {
      postId
    }
  });
}

function getEmbed(postId) {
  return Embed.findOne({
    where: {
      postId
    }
  }).then(embed => embed);
}

module.exports = {
  Login,
  RegisterUser,
  isValid,
  VerifyAuth,
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
  getEmbed,
  getCategoryByPostId,
  getPostByCategoryId
};
