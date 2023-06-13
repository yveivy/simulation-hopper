const mongoose = require('mongoose');
const seedCharacters = require('./characterData');
const seedItems = require('./itemData');
const seedInventory = require('/inventoryData');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  userNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  try {
    await seedCharacters();

    await seedItems();

    await seedInventory();

    console.log('Database seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
  }
};

seedDatabase();