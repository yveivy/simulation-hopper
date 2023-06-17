class SaveFileAPI {
  constructor(req) {
    this.req = req;
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