const { ApolloServer } = require('apollo-server');
const { VerifyAuth } = require('./db');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const auth = (req.headers && VerifyAuth(req.headers.token)) || '';
    return auth;
  }
});

server
  .listen({ port: 4000 })
  .then(({ url }) => console.log(`🚀 app running at ${url}`));
