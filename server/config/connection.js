// const { connect, connection } = require('mongoose');
// require('dotenv/config')

// let connectionString;

// if (process.env.NODE_ENV === 'production') {
//     connectionString = process.env.SERVER_MONGODB_URI;
// } else {
//     connectionString = process.env.LOCAL_MONGODB_URI;
// }

// connect(connectionString);

// module.exports = connection;


// ===================
// Comment out everything above this line to use J's connection
// (vice versa for Yevettes)

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://jomsey:user1234@cluster0.sf4qafq.mongodb.net/simulationHopperDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Handle connection error
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Handle successful connection
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

module.exports = db;