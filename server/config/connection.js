require('dotenv').config()
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI, {
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