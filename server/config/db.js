const { MongoClient } = require('mongodb');
require('dotenv').config();

// this is where we pass in user info. we will alter this to grab user input from where user Creates Their Account. during testing, it is a static value as defined below
const userinfo = {
  username: 'developer',
  password: 'pass1234'
};


const playerLocation = {
  x: 1,
  y: 1
}

const client = new MongoClient(process.env.MONGODB_URI);

async function createNewUserAndSeedDatabase(userinfo) {
  // Connection URL

  // Database Name
  const dbName = 'simulationHopperDB';

  // Create a new MongoClient

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the database
    const db = client.db(dbName);

    const collectionName = userinfo.username

    // Create a new collection
    const collection = db.collection(collectionName);

    // Create the document to be inserted
    const newUserSaveFile = {
      userinfo,
      playerLocation,
      inventory: {
          "abe": {
            "hasMet": false,
            "balm": false,
            "compass": true,
            "elixir": false,
            "feather": false,
            "harp": false,
            "lantern": false,
            "logBook": false,
            "locket": false,
            "medicalKit": false,
            "newt": false,
            "pocketWatch": false,
            "scope": true,
            "spanner": false,
            "spade": false,
            "striders": false,
            "translator": false
          },
          "barf": {
            "hasMet": true,
            "balm": false,
            "compass": false,
            "elixir": false,
            "feather": false,
            "harp": false,
            "lantern": false,
            "logBook": true,
            "locket": false,
            "medicalKit": true,
            "newt": false,
            "pocketWatch": true,
            "scope": false,
            "spanner": false,
            "spade": false,
            "striders": false,
            "translator": true
          },
          "hydra": {
            "hasMet": false,
            "balm": true,
            "compass": false,
            "elixir": false,
            "feather": false,
            "harp": false,
            "lantern": false,
            "logBook": false,
            "locket": false,
            "medicalKit": false,
            "newt": true,
            "pocketWatch": false,
            "scope": false,
            "spanner": false,
            "spade": false,
            "striders": false,
            "translator": false
          },
          "shady": {
            "hasMet": false,
            "balm": false,
            "compass": false,
            "elixir": false,
            "feather": true,
            "harp": false,
            "lantern": false,
            "logBook": false,
            "locket": true,
            "medicalKit": false,
            "newt": false,
            "pocketWatch": false,
            "scope": false,
            "spanner": false,
            "spade": false,
            "striders": false,
            "translator": false
          },
          "taylor": {
            "hasMet": false,
            "balm": false,
            "compass": false,
            "elixir": false,
            "feather": false,
            "harp": false,
            "lantern": true,
            "logBook": false,
            "locket": false,
            "medicalKit": false,
            "newt": false,
            "pocketWatch": false,
            "scope": false,
            "spanner": false,
            "spade": false,
            "striders": true,
            "translator": false
          },
          "violet": {
            "hasMet": false,
            "balm": false,
            "compass": false,
            "elixir": true,
            "feather": false,
            "harp": true,
            "lantern": false,
            "logBook": false,
            "locket": false,
            "medicalKit": false,
            "newt": false,
            "pocketWatch": false,
            "scope": false,
            "spanner": false,
            "spade": false,
            "striders": false,
            "translator": false
            },
          "zara": {
            "hasMet": false,
            "balm": false,
            "compass": false,
            "elixir": false,
            "feather": false,
            "harp": false,
            "lantern": false,
            "logBook": false,
            "locket": false,
            "medicalKit": false,
            "newt": false,
            "pocketWatch": false,
            "scope": false,
            "spanner": true,
            "spade": true,
            "striders": false,
            "translator": false
          } 
      }
    };

    // Insert the document into the collection
    const result = await collection.insertOne(newUserSaveFile);
    console.log(`${result.insertedCount} document inserted.`);

    // Print the inserted document's _id
    console.log(`Created account for ${userinfo.username}`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the client connection
    await client.close();
  }
};


// todo Uncomment the function below and run node server/config/db.js to create user.

// createNewUserAndSeedDatabase(userinfo)

// todo Comment it out again before you run the server or it will seed again.
// 

module.exports = { client, userinfo }