const { Login, RegisterUser, isValid, getMe, inputPost, getUserByID, inputComment, getPost, getRatingByParentID, getPostByID, getCommentByParentID } = require("../db/index")

module.exports = {
    Query: {
        me: async (_, __, _context) => {
            const me = await getMe(_context.id)
            return me
        },
        posts: () => {
            const post = getPost()
            return post
        }
    },
    Post: {
        author: (parent, _) => {
            const user = getUserByID(parent.author_id)
            return user
        },
        rating: (parent, _) => {
            const rating = getRatingByParentID(parent.id)
            return rating
        },
        comments: (parent, _) => {
            const comments = getCommentByParentID(parent.id)
            return comments
        }
    },
    Rating: {
        post: (parent, _) => {
            const post = getPostByID(parent.postId)
            return post
        }
    },
    Comment: {
        commenter: (parent, _) => {
            const user = getUserByID(parent.userId)
            return user
        },
        reply: (parent, _) => {
            if (parent.reply) {
                const reply = getCommentByParentID(parent.reply_for_id)
                return reply
            }
            return null
        }
    },
    Mutation: {
        daftar: async (_obj, { input }) => {
            return RegisterUser(input)
        },
        login: (_, { input: { username, password } }) => {
            return Login(username, password);
        },
        validation: (_, { username, email }, _context, _info) => {
            return isValid(username, email)
        },
        post: (_, { input }, _context) => {
            return inputPost(input, _context.id)
        },
        postcomment: (_, { input }) => {
            return inputComment(input)
        }
    }
}