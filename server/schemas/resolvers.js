
const { Characters, Items, Inventory, User} = require('../models');

const resolvers = {
  Query: {
    test: () => 'Test get route is working',


   inventoryByCharacter: async (_, { character }) => {
      try {
        const inventory = await Inventory.findAll({
          attributes: { exclude: [ 'full_name', 'item_name']},
          include: [

          { 
            model: Characters,
            where: { searchable_name: character },
            attributes: { exclude: ['searchable_name', 'full_name', 'role', 'bio'] }
          },

          {
            model: Items,
            attributes: { exclude: ['searchable_item'] },

          },
        ],
          
        });

        return inventory; 

      } catch (error) {
        console.error(error);
        throw new Error('Internal server error');
      }
    },

   



   inventory: async () => {
      
   },

   biography: async (_, { searchableName }) => {

   },

   item: async (_, { searchableItem }) => {

   },

   items: async () => {

   },

  },
  
  Mutation: {
    // testPut: () => 'Test put route is working',

    trade: async (_, { item1, item2}) => {
      //logic to swap items and update the inventory and return updated inventory object
    },

    createUser: async (_, { username, email, password}) => {
      try {
        const dbUserData = await User.create({ username, email, password});
        return dbUserData;
      } catch (err){
        console.log(err);
        throw new Error('Failed to create user')
      }
    },

    loginUser: async (_, { email, password }, { req}) => {
      try {
        const dbUserData = await User.findOne({ where: { email} });

        if (!dbUserData) {
          throw new Error('Incorrect email or password. Please try again!');
        }

        const validPassword = await dbUserData.checkPassword(password);

        if (!validPassword) {
          throw new Error('Incorrect email or password. Please try again!');
        }

        req.session.loggedIn = true;
        return dbUserData;
      } catch (err) {
        console.log(err);
        throw new Error('Failed to login user');
      }
    },

    logoutUser: (_, __, { req }) => {
      if (req.session.loggedIn) {
        req.session.destroy();
        return true;
      } else {
        return false;
      }
    },
  },

};

module.exports = resolvers;
