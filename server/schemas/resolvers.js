const { Characters, Items } = require('../models/index')
const { client, userinfo } = require('../config/db')
const saveFileAPI = require('../utils/saveFileAPI')

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
    userSaveFile: async () => {
      const database = client.db('simulationHopperDB');
      const collection = database.collection(userinfo.username);
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
    tradeItems: async (_, { tradeWith, barfGives, barfGets }, { dataSources }) => {
      const userSaveFile = await dataSources.saveFileAPI.getUserSaveFile();

      if (!userSaveFile) {
        throw new Error("User save file not found");
      }
      const characterName = "barf"
      const characterInventory = userSaveFile.inventory[characterName];
      const tradeWithInventory = userSaveFile.inventory[tradeWith];


      characterInventory[barfGives] = false;
      characterInventory[barfGets] = true;
      tradeWithInventory[barfGives] = true;
      tradeWithInventory[barfGets] = false;

      await dataSources.saveFileAPI.saveUserSaveFile(userSaveFile);

      return userSaveFile;
    },
  },
};


module.exports = resolvers;
