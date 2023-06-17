require('dotenv').config();
const mongoose = require('mongoose');
const characterData = require('./characterData.json');
const itemData = require('./itemData.json');
const { Characters, Items } = require('../models');
const db = require('../config/connection')

db.once('open', async () => {
  await Characters.deleteMany({});
  await Items.deleteMany({});
  const characters = await Characters.insertMany(characterData);
  const items = await Items.insertMany(itemData);

  console.log('Character and Item info seeded');
  process.exit(0);
});
