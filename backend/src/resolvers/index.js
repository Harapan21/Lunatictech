const { Login, RegisterUser, isValid, getMe, inputPost } = require("../db/index")

module.exports = {
    Query: {
        me: async (_, __, _context, _info) => {
            const me = await getMe(_context.id)
            console.log(me)
            return me
        }
    },
    Mutation: {
        daftar: async (_obj, { input }, _context, _info) => {
            return RegisterUser(input)
        },
        login: (_, { input: { username, password } }, _context, _info) => {
            return Login(username, password);
        },
        validation: (_, { username, email }, _context, _info) => {
            return isValid(username, email)
        },
        post: (_, { input }, _context) => {
            return inputPost(input, _context.id)
        }
    }
}