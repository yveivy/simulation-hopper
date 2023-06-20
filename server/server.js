const express = require('express');
const { ApolloServer }= require('apollo-server-express');
const path = require('path');
const jwt = require('jsonwebtoken');
const router = require("./api/routes.js");
require('dotenv').config()


const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    const token = req?.headers?.authorization || req?.query?.token || req?.cookies?.token;
    let user = null;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        user = decoded;
      } catch (err) {
        // Handle invalid or expired token
        throw new Error('Invalid or expired token');
      }
    }

    return { user, res };
  },
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', router);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
} else {
  app.use(express.static(path.join(__dirname, '../client/public')));
}

app.get('*', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
} else {
  res.sendFile(path.join(__dirname, '../client/public/game/index.html'))
}
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    console.log('Connected to MongoDB database')
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer();
 
