const { ApolloServer } = require("apollo-server")
const { InMemoryCache } = require('apollo-cache-inmemory')
const { VerifyAuth } = require("./db")
const typeDefs = require("./schema")
const resolvers = require("./resolvers")

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = (req.headers && req.headers.token) || ''
        return VerifyAuth(auth)
    },
    cache: new InMemoryCache()
})

server
    .listen({ port: 4000 })
    .then(({ url }) => console.log(`🚀 app running at ${url}`));