const mongoose = require('mongoose');
const characterData = require('./characterData.json');
const itemData = require('./itemData.json');
const Characters = require('../models/characters')
const Items = require('../models/items')
const db = require('../config/connection')
require('dotenv').config();


db.once('open', async () => {
  await Characters.deleteMany({});
  await Items.deleteMany({});
  const characters = await Characters.insertMany(characterData);
  const items = await Items.insertMany(itemData);

  console.log('Character and Item info seeded');
  process.exit(0);
});