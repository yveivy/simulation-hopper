const { client, userinfo } = require('../config/db')

class saveFileAPI {

  async getUserSaveFile() {
    const database = client.db('simulationHopperDB');
    const collectionName = userinfo.username
    const collection = database.collection(collectionName);
    try {
      const dbData = await collection.findOne();
      console.log(dbData)
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
}

module.exports = saveFileAPI;