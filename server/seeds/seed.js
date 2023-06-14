const mongoose = require('mongoose');
const { Characters, Items } = require('../models');

const characterData = require('./characterData');
const itemData = require('./itemData');
require('dotenv').config();


console.log('MONGODB_URI:', process.env.MONGODB_URI);
mongoose.connect('mongodb+srv://yveivy:Yevette1@classactivities.fq7zpnf.mongodb.net/gameDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  try {
    await Characters.deleteMany({});
    await Characters.insertMany(characterData);

    await Items.deleteMany({});
    await Items.insertMany(itemData);

    console.log('Database seeding for characters and items completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();