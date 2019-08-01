const fs = require('fs')
// handle database
// doc : https://sequelize.org/master/
const Sequelize = require('sequelize');
// import jeson web token
// doc : https://www.npmjs.com/package/jsonwebtoken
const jwt = require('jsonwebtoken');

const db = process.env.PRODUCTION ? 'db' : 'localhost';

const privateKEY = fs.readFileSync(__dirname + '/key/private.key', 'utf8');
const publicKEY = fs.readFileSync(__dirname + '/key/public.key', 'utf8');
const signOption = {
    expiresIn: '1d',
    algorithm: 'RS256'
}
const sequelize = new Sequelize('smile', 'root', 'Smile:)00', {
    host: db,
    dialect: 'mysql'
});

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
            fields: ["username", "email", "fullname", "password", "avatar"]
        }
    )
    if (!user) {
        return {
            login: false,
            token: ""
        }
    }
    return Login(username, password)
}

async function Login(username, password) {
    const { user_id } = await User.findOne({
        where: {
            username,
            password
        }
    })
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

module.exports = { Login, RegisterUser };
