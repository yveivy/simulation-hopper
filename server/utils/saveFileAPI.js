const { client, userinfo } = require('../config/db')

class saveFileAPI {
  getDatabase() {
    return client.db('simulationHopperDB');
  }
  async getUserSaveFile() {
    const database = client.db('simulationHopperDB');
    const collectionName = userinfo.username
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
    const collectionName = userinfo.username
    const collection = database.collection(collectionName);

    try {
      await collection.replaceOne({}, data, { upsert: true }); // 
      console.log('User save file saved successfully');
    } catch (error) {
      console.error('Failed to save user save file:', error);
    }
  }
  async createNewCollection(collectionName, data) {
    const database = this.getDatabase();
    const collection = database.collection(collectionName)
    try {
      await collection.insertOne(data);
      console.log(`Created collection: ${collectionName} and seeded data`);
    } catch (error) {
      console.error(`Failed to create collection: ${collectionName}`, error);
    }
  }
}

module.exports = saveFileAPI;