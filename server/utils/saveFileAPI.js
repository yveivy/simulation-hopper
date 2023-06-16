const { client } = require('../config/db');
const { tokenVerifier } = require('./tokenVerifier');
class SaveFileAPI {
  constructor(req) {
    this.req = req;
  }
  getDatabase() {
    return client.db('simulationHopperDB');
  }
  async getUserSaveFile() {
    const database = client.db('simulationHopperDB');
    // const token = req?.headers?.authorization || req?.query?.token || req?.cookies?.token;
    const token = 'token goes here';
    const { username } = tokenVerifier(token);
    const collectionName = username;
    const collection = database.collection(collectionName);
    try {
      const dbData = await collection.findOne();
      return dbData;
      } catch (error) {
        console.error('Failed to retrieve data from the database:', error);
        return null;
      }
    }

  async saveUserSaveFile(data) {
    const database = client.db('simulationHopperDB');

    // const token = req?.headers?.authorization || req?.query?.token || req?.cookies?.token;
    const token = 'token goes here';
    const { username } = tokenVerifier(token)

    const collectionName = username
    const collection = database.collection(collectionName);

    try {
      await collection.replaceOne({}, data, { upsert: true });
      console.log(`Successfully updated ${collectionName}'s progress`);
    } catch (error) {
      console.error(`Failed to update ${collectionName}'s progress.`, error);
    }
  }
  async createNewCollection(collectionName, data) {
    const database = this.getDatabase();
    const collection = database.collection(collectionName)
    try {
      await collection.insertOne(data);
      console.log(`Created account for "${collectionName}" and seeded data`);
    } catch (error) {
      console.error(`Failed to create collection: ${collectionName}`, error);
    }
  }
}

module.exports = SaveFileAPI;