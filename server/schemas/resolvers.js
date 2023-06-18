const { Characters, Items } = require('../models/index')
const { MongoClient } = require('mongodb')
const { newUserData } = require('../seeds/newUserData')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { tokenVerifier } = require('../utils/tokenVerifier')
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI);

const resolvers = {
  Query: {
    // retrive information about a single character
    getOneCharacterInfo: async (_, { searchable_name }) => {
      try {
        const character = await Characters.findOne({ searchable_name });
        if (!character) {
          throw new Error('Character not found');
        }

        return {
          full_name: character.full_name,
          role: character.role,
          bio: character.bio,
        };
      } catch (error) {
        console.error(error);
        throw new Error('Internal server error')
      }
    },
    // retrieve info about a single item -- input variable = searchable_item
    getOneItem: async (_, { searchable_item }) => {
      console.log("resolvers.js getOneItem()____________", searchable_item)
      try {
        const foundItem = await Items.findOne({ searchable_item });

        if (!foundItem) {
          throw new Error('Item not found');
        }

        return {
          item_name: foundItem.item_name,
          description: foundItem.description,
        };
      } catch (error) {
        console.error(error);
        throw new Error('Internal server error');
      }
    },
    // references Items model which houses information about all items
    getItems: async () => {
      try {
        const allItems = await Items.find({}, { item_name: 1, description: 1 });

        return allItems.map((item) => ({
          item_name: item.item_name,
          description: item.description,
        }));
      } catch (error) {
        console.error(error);
        throw new Error('Internal server error');
      }
    },
    // User Save File References the db collection which contains the users game progress.
    userSaveFile: async (_, { username, token }) => {
      const database = client.db(process.env.DB_NAME);
      let collectionName;
      // allow front end to supply token from localStorage as argument
      if (token) {
        collectionName = tokenVerifier(token).username
        // allow username supplied by login/create user function to be used as argument
      } else if (username) {
        collectionName = username
      }
      const collection = database.collection(collectionName);
      try {
        const dbData = await collection.findOne(); // Retrieve the data from the collection
        return dbData;
      } catch (error) {
        console.error('Failed to retrieve data from the database:', error);
        return null;
      }
    },
    // references Characters model which houses information about all characters
    getAllCharacters: async () => {
      try {
        // Fetch all characters from the Character collection
        const characters = await Characters.find();
        return characters;
      } catch (error) {
        throw new Error('Failed to fetch characters');
      }
    },
  },
  Userinfo: {
    username: (parent) => parent.username,
    password: (parent) => parent.password,
  },  
  CharacterInventories: {
    abe: (parent) => {
      return parent.abe;
    },
    barf: (parent) => { 
      return parent.barf; 
    },
    hydra: (parent) => {
      return parent.hydra;
    },
    shady: (parent) => {
      return parent.shady;
    },
    taylor: (parent) => {
      return parent.taylor;
    },
    violet: (parent) => {
      return parent.violet;
    },
    zara: (parent) => {
      return parent.zara;
    }
  },
  Mutation: {
    tradeItems: async (_, { tradeWith, barfGives, barfGets, token } ) => {
      const database = client.db(process.env.DB_NAME);
      const collectionName = tokenVerifier(token).username
      const collection = database.collection(collectionName)
      const userSaveFile = await collection.findOne()
      console.log("line 124", collectionName)

      if (!userSaveFile) {
        throw new Error("User save file not found");
      }
      const characterName = "barf"
      console.log("line 130", userSaveFile)
      const characterInventory = userSaveFile.inventory[characterName];
      const tradeWithInventory = userSaveFile.inventory[tradeWith];


      characterInventory[barfGives] = false;
      characterInventory[barfGets] = true;
      tradeWithInventory[barfGives] = true;
      tradeWithInventory[barfGets] = false;

      await await collection.replaceOne({}, userSaveFile, { upsert: true });

      return userSaveFile;
    },
    markCharacterAsMet: async (_, { characterName, token } ) => {
      const database = client.db(process.env.DB_NAME);
      const collectionName = tokenVerifier(token).username
      const collection = database.collection(collectionName)
      const userSaveFile = await collection.findOne()

      if (!userSaveFile) {
        throw new Error("User save file not found");
      }

      const characterInventory = userSaveFile.inventory[characterName];

      // Update the hasMet value for the character
      characterInventory.hasMet = true;

      await collection.replaceOne({}, userSaveFile, { upsert: true });

      // Return the updated hasMet value
      return characterInventory.hasMet;
    },
    createNewUser: async (_, { username, password } ) => {
      const collectionName = username; // Set the collection name to the username

      const hashedPassword = await bcrypt.hash(password, 10);
      const userinfo = { username, password: hashedPassword }
      const shhhhhh = process.env.JWT_SECRET_KEY
      const token = jwt.sign({ username }, shhhhhh, { expiresIn: '1h' });

      const newUserSaveFile = {
        userinfo: userinfo,
        ...newUserData,
        token: token
      };
      console.log('userinfo____', userinfo)
      console.log('newUserSaveFile_____', newUserSaveFile)
      const database = client.db(process.env.DB_NAME);
      const collection = database.collection(collectionName);
      try {
      await collection.insertOne(newUserSaveFile);
      console.log(`Created account for "${collectionName}" and seeded data`);
    } catch (error) {
      console.error(`Failed to create collection: ${collectionName}`, error);
    }

      return newUserSaveFile;
    },
    userLogIn: async (_, {username, password } ) => {
      const database = client.db('simulationHopperDB');
      const collection = database.collection(username);
      try {
        const dbData = await collection.findOne();
        const hashedPw = dbData.userinfo.password
        const result = await new Promise((resolve, reject) => {
          bcrypt.compare(password, hashedPw, (err, result) => {
          if (err) {
            console.error(err)
            reject (err)
          } else {
            resolve(result);
          }
        });
      });
      

      if (result) {
        try {
          const shhhhhh = process.env.JWT_SECRET_KEY
          const newToken = jwt.sign({ username }, shhhhhh, { expiresIn: '1h' });
          console.log("newly generated token", newToken)

          const insertNewToken = await collection.findOneAndUpdate(
            { 'userinfo.username': username },
            { $set: { 'token': newToken } },
            { new: true }
          )
          const updatedResult = await collection.findOne(
            { 'userinfo.username': username }
          )
          return updatedResult;
        } catch (error) {
          console.error('could not update token', error);
        }
      } else {
        console.log('no match')
        return null;
      }
      } catch (error) {
        console.error('Incorrect Credentials', error);
        return null;
      }
    }
  },
};


module.exports = resolvers;
