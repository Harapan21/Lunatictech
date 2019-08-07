const { ApolloServer } = require('apollo-server');
const { VerifyAuth } = require('./db');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    if (req.headers && req.headers.token) {
      return VerifyAuth(req.headers.token);
    }
    return;
  },
  uploads: {
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20
  }
});

server
  .listen({ port: 4000 })
  .then(({ url }) => console.log(`🚀 app running at ${url}`));
