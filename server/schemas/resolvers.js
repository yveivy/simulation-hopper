
const { Characters, Items, Inventory, User} = require('../models');

const resolvers = {
  Query: {
    test: () => 'Test get route is working',

    //The logic below needs to be replaced by J's code to pull the current inventory by character from the user database

  //  inventoryByCharacter: async (_, { character }) => {


  //     try {
  //       const inventory = await Inventory.find({ character }).populate('characters').populate({ 
  //         path: 'item',
  //         model: 'Items',
  //         select: 'item_name description',
  //       });

  //         return inventory;
  //     } catch (error) {
  //       console.error(error);
  //       throw new Error('Internal server error');
  //     }
  //   },

  
    biography: async (_, { searchable_name }) => {
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

    item: async (_, { searchable_item }) => {
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

    items: async () => {
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

  },
  
  // Mutation: {
    // testPut: () => 'Test put route is working',

    //All code below to be replaced by J's mutations to trade the items, create user, login and logout user.

  //   trade: async (_, { item1, item2}) => {
  //     //logic to swap items and update the inventory and return updated inventory object
  //     try {
  //       // Logic to perform the trade operation
  //       // Retrieve the characters and items from the database
  //       console.log('Item1:', item1);
  //       console.log('Item2:', item2);


  //       console.log('Before retrieving inventory1');
  //       const inventory1 = await Inventory.findOne({ searchable_item: item1 });
  //       console.log('Inventory1:', inventory1);

  //       console.log('Before retrieving inventory2');
  //       const inventory2 = await Inventory.findOne({ searchable_item: item2 });
  //       console.log('Inventory2:', inventory2);
        

  //       if (!inventory1 || !inventory2) {
  //         console.log('One or more items not found in the inventory');
  //         throw new Error('One or more items not found in the inventory');
  //       }

  //       inventory1.searchable_item = item2;
  //       inventory2.searchable_item = item1;
        
  //       await inventory1.save();
  //       await inventory2.save();

  //       const updatedInventory1 = {
  //         searchable_name: inventory1.searchable_name,
  //         searchable_item: item2,
  //       };
  //       const updatedInventory2 = {
  //         searchable_name: inventory2.searchable_name,
  //         searchable_item: item1,
  //       };
  //       return [updatedInventory1, updatedInventory2];

  //     } catch (error) {
  //       throw new Error('Failed to perform trade operation');
  //     }

  //   },

  //   createUser: async (_, { username, email, password}) => {
  //     try {
  //       const dbUserData = await User.create({ username, email, password});
  //       return dbUserData;
  //     } catch (err){
  //       console.log(err);
  //       throw new Error('Failed to create user')
  //     }
  //   },

  //   loginUser: async (_, { email, password }, { req}) => {
  //     try {
  //       const dbUserData = await User.findOne({ where: { email} });

  //       if (!dbUserData) {
  //         throw new Error('Incorrect email or password. Please try again!');
  //       }

  //       const validPassword = await dbUserData.checkPassword(password);

  //       if (!validPassword) {
  //         throw new Error('Incorrect email or password. Please try again!');
  //       }

  //       req.session.loggedIn = true;
  //       return dbUserData;
  //     } catch (err) {
  //       console.log(err);
  //       throw new Error('Failed to login user');
  //     }
  //   },

  //   logoutUser: (_, __, { req }) => {
  //     if (req.session.loggedIn) {
  //       req.session.destroy();
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   },
  // },

};

module.exports = resolvers;
