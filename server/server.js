// const express = require('express');
// const { ApolloServer } = require('apollo-server-express');
// const path = require('path');

// const { typeDefs, resolvers } = require('./schemas');
// const db = require('./config/connection');

// const PORT = process.env.PORT || 3001;
// const app = express();
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
//   app.use('/game', express.static(path.join(__dirname, 'client/public/game')));
// }

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// app.get('/game', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/public/game/index.html'));
// });

// app.get('*', (req, res) => {
//   // Handle any requests that aren't handled by the above routes
//   res.status(404).send('Not found');
// });


// // Create a new instance of an Apollo server with the GraphQL schema
// const startApolloServer = async () => {
//   await server.start();
//   server.applyMiddleware({ app });
  
//   db.once('open', () => {
//     app.listen(PORT, () => {
//       console.log(`API server running on port ${PORT}!`);
//       console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
//     })
//   })
//   };
  
// // Call the async function to start the server
//   startApolloServer();





  // ==================================
  // comment out everything above this line to use J server setup.
  // we can work on unifying both versions of server setup.

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const saveFileAPI = require('./utils/saveFileAPI')
const path = require('path');
// const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    saveFileAPI: new saveFileAPI(),
  })
  // context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer();
 
