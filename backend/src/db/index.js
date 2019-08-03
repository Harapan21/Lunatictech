const fs = require('fs')
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
}
// /jwt
const sequelize = new Sequelize('smile', 'root', 'Smile:)00', {
    host: "localhost",
    dialect: 'mysql'
});

// models
const Comment = sequelize.import('./models/comment');
const ContributorUser = sequelize.import('./models/contributor_user');
const Embed = sequelize.import('./models/embed');
const Post = sequelize.import('./models/post');
const Rating = sequelize.import('./models/rating');
const User = sequelize.import('./models/usr_smile');

async function RegisterUser({ username, password, ...rest }) {
    const user = await User.create(
        {
            username,
            password,
            ...rest
        },
        {
            validation: true,
            fields: ["username", "email", "fullname", "password", "avatar"]
        }
    )
    if (!user) {
        return {
            login: false,
            token: null
        }
    }
    return Login(username, password)
}


async function isValid(usernameField, emailField) {
    const isUsername = usernameField != undefined ? await User.findAndCountAll({ where: { username: usernameField } }).then(({ count }) => count > 0) : false
    const isEmail = emailField != undefined ? await User.findAndCountAll({ where: { email: emailField } }).then(({ count }) => count > 0) : false

    return {
        username: isUsername,
        email: isEmail
    }
}

async function getMe(id) {
    const user = await getUserByID(id)
    const post = await Post.findAll({
        where: {
            author_id: id
        }
    })
    return {
        ...user,
        post: [...post]
    }
}

async function getPostByID(id) {
    const { dataValues } = await Post.findOne({
        where: {
            id
        }
    })
    return dataValues
}

async function getPost() {
    return await Post.findAll()
}

async function getUserByID(id) {
    const { dataValues } = await User.findOne({
        where: {
            user_id: id
        }
    })
    return dataValues
}

async function getRatingByParentID(postId) {
    const { dataValues } = await Rating.findOne({
        where: {
            postId
        }
    })
    return dataValues
}

async function getCommentByParentID(id) {
    const comments = await Comment.findAll({
        where: {
            postId: id
        }
    })
    return comments
}


async function Login(username, password) {
    const { user_id } = await User.findOne({
        where: {
            username,
            password
        }
    })
    if (!user_id || user_id === undefined) {
        return {
            login: false,
            token: null
        }
    }
    const auth = Auth(user_id)
    return auth
}

function Auth(id) {
    const token = jwt.sign({ id }, privateKEY, signOption);

    const auth = {
        login: true,
        token
    }
    return auth
}
function VerifyAuth(token) {
    const parse = jwt.verify(token, publicKEY)
    return parse
}


function inputPost(post, id) {
    return Post.create({
        author_id: id,
        ...post
    }).then(() => {
        return true
    })
}

function inputComment(comment) {
    return Comment.create({
        ...comment
    }).then(() => {
        return true
    })
}


module.exports = { Login, RegisterUser, isValid, VerifyAuth, getMe, inputPost, getUserByID, inputComment, getPost, getRatingByParentID, getPostByID, getCommentByParentID };
