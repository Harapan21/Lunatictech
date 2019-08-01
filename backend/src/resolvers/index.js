const { Login, RegisterUser } = require("../db/index")
module.exports = {
    Query: {

    },
    Mutation: {
        daftar: (_obj, { input }, _context, _info) => {
            return RegisterUser(input)
        },
        login: (_, { input: { username, password } }) => {
            return Login(username, password);
        }
    }
}