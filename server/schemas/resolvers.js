const { Tech, Matchup } = require('../models');

const { Characters, Items, Inventory} = require('../models');

const resolvers = {
  Query: {
    test: () => 'Test get route is working',

    tech: async () => {
      return Tech.find({});
    },
    matchups: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Matchup.find(params);
    },

   inventoryByCharacter: async (_, { character }) => {
      try {
        const inventory = await Inventory.findAll({
          attributes: { exclude: [ 'id', 'character_id', 'item_id']},
          include: [

          { 
            model: Characters,
            where: { searchable_name: character },
            attributes: { exclude: ['character_id', 'searchable_name', 'full_name', 'role', 'bio'] }
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
    testPut: () => 'Test put route is working',

    createMatchup: async (parent, args) => {
      const matchup = await Matchup.create(args);
      return matchup;
    },
    createVote: async (parent, { _id, techNum }) => {
      const vote = await Matchup.findOneAndUpdate(
        { _id },
        { $inc: { [`tech${techNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },

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
