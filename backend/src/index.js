const { ApolloServer } = require("apollo-server")
const { InMemoryCache } = require('apollo-cache-inmemory')
const typeDefs = require("./schema")
const resolvers = require("./resolvers")

const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: new InMemoryCache()
})

server
    .listen({ port: 4000 })
    .then(({ url }) => console.log(`🚀 app running at ${url}`));