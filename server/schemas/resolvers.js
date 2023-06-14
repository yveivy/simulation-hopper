
// const { Characters, Items, Inventory, User} = require('../models');

// const resolvers = {
//   Query: {
//     test: () => 'Test get route is working',


//    inventoryByCharacter: async (_, { character }) => {
//       try {
//         const inventory = await Inventory.findAll({
//           attributes: { exclude: [ 'id', 'character_id', 'item_id']},
//           include: [

//           { 
//             model: Characters,
//             where: { searchable_name: character },
//             attributes: { exclude: ['character_id', 'searchable_name', 'full_name', 'role', 'bio'] }
//           },

//           {
//             model: Items,
//             attributes: { exclude: ['searchable_item'] },

//           },
//         ],
          
//         });

//         return inventory; 

//       } catch (error) {
//         console.error(error);
//         throw new Error('Internal server error');
//       }
//     },

   



//    inventory: async () => {
      
//    },

//    biography: async (_, { searchableName }) => {

//    },

//    item: async (_, { searchableItem }) => {

//    },

//    items: async () => {

//    },

//   },
  
//   Mutation: {
//     testPut: () => 'Test put route is working',

//     trade: async (_, { item1, item2}) => {
//       //logic to swap items and update the inventory and return updated inventory object
//     },

//     createUser: async (_, { username, email, password}) => {
//       try {
//         const dbUserData = await User.create({ username, email, password});
//         return dbUserData;
//       } catch (err){
//         console.log(err);
//         throw new Error('Failed to create user')
//       }
//     },

//     loginUser: async (_, { email, password }, { req}) => {
//       try {
//         const dbUserData = await User.findOne({ where: { email} });

//         if (!dbUserData) {
//           throw new Error('Incorrect email or password. Please try again!');
//         }

//         const validPassword = await dbUserData.checkPassword(password);

//         if (!validPassword) {
//           throw new Error('Incorrect email or password. Please try again!');
//         }

//         req.session.loggedIn = true;
//         return dbUserData;
//       } catch (err) {
//         console.log(err);
//         throw new Error('Failed to login user');
//       }
//     },

//     logoutUser: (_, __, { req }) => {
//       if (req.session.loggedIn) {
//         req.session.destroy();
//         return true;
//       } else {
//         return false;
//       }
//     },
//   },

// };

// module.exports = resolvers;




// =======================
// comment out everything above this line to use J resolvers

const { client, userinfo } = require('../config/db')
const saveFileAPI = require('../utils/saveFileAPI')
const { Characters, Items } = require('../models/index')



const resolvers = {
  Query: {
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
    Characters: async () => {
      try {
        // Fetch all characters from the Character collection
        const characters = await Characters.find();
        return characters;
      } catch (error) {
        throw new Error('Failed to fetch characters');
      }
    },
    Items: async () => {
      try {
        // Fetch all items from the Item collection
        const items = await Items.find();
        return items;
      } catch (error) {
        throw new Error('Failed to fetch items');
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
    tradeItems: async (_, { characterName, tradeWith, itemToTrade, itemToAcquire }, { dataSources }) => {
      const userSaveFile = await dataSources.saveFileAPI.getUserSaveFile();

      if (!userSaveFile) {
        throw new Error("User save file not found");
      }

      const characterInventory = userSaveFile.inventory[characterName];
      const tradeWithInventory = userSaveFile.inventory[tradeWith];


      characterInventory[itemToTrade] = false;
      characterInventory[itemToAcquire] = true;
      tradeWithInventory[itemToTrade] = true;
      tradeWithInventory[itemToAcquire] = false;

      await dataSources.saveFileAPI.saveUserSaveFile(userSaveFile);

      return userSaveFile;
    },
    getCharacter: async (_, { searchableName }) => {
      try {
        const character = await Characters.findOne({ searchable_name: searchableName });
        
        if (!character) {
          throw new Error('Character not found');
        }
        
        return character;
      } catch (error) {
        throw new Error(`Failed to fetch character: ${error.message}`);
      }
    },
    getItem: async (_, { searchableItem }) => {
      try {
        // Fetch the character by their searchable_name
        const item = await Items.findOne({ searchable_item: searchableItem });
        
        if (!item) {
          throw new Error('Item not found');
        }
        
        return item;
      } catch (error) {
        throw new Error(`failed to fetch item: ${error.message}`);
      }
    },
  },
};
module.exports = resolvers;
