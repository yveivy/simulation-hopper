
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



const resolvers = {
  Query: {
    userSaveFile: async () => {
        const database = client.db('simulationHopperDb');
        const collection = database.collection(userinfo.username);
      try {
        const dbData = await collection.findOne(); // Retrieve the data from the collection
        return dbData;
      } catch (error) {
        console.error('Failed to retrieve data from the database:', error);
        return null;
      }
    }
  },
  Character: {
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
      return parent.taylor
    },
    violet: (parent) => {
      return parent.violet
    },
    zara: (parent) => {
      return parent.zara
    }
  },
  CharacterObject: {
    detail: (characterObject) => {
      return characterObject.detail
    },
    inventory: (characterObject) => {
      const inventory = characterObject.inventory
      return Object.keys(inventory).map((key) => ({
        key,
        ...inventory[key],
      }));
    },
    wishlist: (characterObject) => {
      return characterObject.wishlist
    }
  },
  InventoryContainer: {
    allItems: (inventoryItem) => {
      return inventoryItem;
    }
  },
  InventoryItem: {
    key: (inventoryObject) => {
      return inventoryObject.key
    },
    description: (inventoryObject) => {
      return inventoryObject.description
    },
    name: (inventoryObject) => {
      return inventoryObject.name
    }
  },
  CharacterDetail: {
    bio: (characterDetail) => {
      console.log(characterDetail);
      return characterDetail.bio
    },
    name: (characterDetail) => {
      return characterDetail.name
    },
    role: (characterDetail) => {
      return characterDetail.role
    }
  },
  Userinfo: {
    username: (parent) => parent.username,
    password: (parent) => parent.password,
  },  

};

module.exports = resolvers;
