const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const { VerifyAuth } = require('./src/db');
const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers');
const http = require('http');
const cors = require('cors');
const fs = require('fs');
const rimraf = require('rimraf');
const { isValid } = require('./src/db');
(async () => {
  fs.readdirSync('uploads', {
    withFileTypes: true
  }).map(async dir => {
    try {
      if (!dir.isFile()) {
        const { username } = await isValid(dir.name);
        if (!username) {
          console.log(`␡ ${dir.name}`);
          rimraf(`./uploads/${dir.name}/`, e => {
            console.log(e);
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  });
})();
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
const app = express();
app.use('/static', express.static('uploads'));
app.use(bodyParser.json());
app.use(cors());
server.applyMiddleware({ app, path: '/graphql' });

http.createServer(app).listen(4000);
