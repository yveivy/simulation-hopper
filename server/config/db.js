const { MongoClient } = require('mongodb');

// this is where we pass in user info. we will alter this to grab user input from where user Creates Their Account. during testing, it is a static value as defined below
const userinfo = {
  username: 'championguy33',
  password: 'pass123456666666787878'
};

const uri = 'mongodb+srv://willrcline:Wi11C1ine$@cluster0.01hpv40.mongodb.net/simulationHopperDB';
const client = new MongoClient(uri);

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
      characters: {
        "abe": {
          "detail": {
            "name": "Abe Harmony",
            "role": "Artist",
            "bio": "Abe is a passionate and resilient soul, that embraces the struggle and sacrifice in pursuit of artistic expression. But lately he feels like he keeps painting the same scenes. Too bad he hates to travel. He'd rather read about someone elses adventures and illustrate the book."
          },
          "inventory": {
            "solarCompass": {
              "name": "Solar Compass",
              "description": "A celestial navigational instrument that harnesses the power of sunlight to guide travelers through uncharted lands. It provides precise directions even in the most treacherous environments."
            },
            "stellarScope": {
              "name": "Stellar Scope",
              "description": "A compact telescope with celestial enchantments. See distant celestial bodies with incredible clarity, unravel cosmic phenomena, and even decipher encrypted astral messages."
            }
          },
          "wishlist": "universalTranslator"
        },
        "barf": {
          "detail": {
            "name": "Barf",
            "role": "Outcast and Wannabe Hero",
            "bio": "Barf is an outcast on his home planet. Building spaceships from junk parts is his passion, but it leaves him looking dirty, smelly and alienated from his community. His planet is running out of oxygen because all the plants are dying. When things on his home planet are dire, Barf steps up with his junk craft to save the people who care little for him. With little more than some scribbled coordinates and a sprig of hope, Barf hurdles himself into space. But junk parts don't make for a smooth landing and he crash lands into his intended destination. Its tough to make a great first impression with the locals when you've somehow lost your pants during the journey."
          },
          "inventory": {
            "astronautsLogBook": {
              "name": "Astronauts Log Book",
              "description": "A weathered and out of print logbook filled with handwritten accounts of a legendary astronaut. The book is filled with vivid descriptions and details of all the places he visited. You can almost imagine it, but it would be even better if it was illustrated."
            },
            "medicalKit": {
              "name": "Medical Kit",
              "description": "Barf has used most of the bandaids but there still may be a few drops of antibiotic and a bit of gauze."
            },
            "timekeepersPocketWatch": {
              "name": "Timekeepers Pocket Watch",
              "description": "A beautifully engraved pocket watch with intricate gears and a mesmerizing ticking sound that lulls even the most fitful sleeper to sleep"
            },
            "universalTranslator": {
              "name": "Universal Translator",
              "description": "A device loaded with software that allows the traveler to understand and communicate in different alien species by translating languages and dialects in real-time. Extremely useful, for space-travel. But it is glitching and currently only translates Zork, the language of a reclusive species that hasn't been seen in eons."
            }
          },
          "wishlist": [
            "gossamerGroveSpade",
            "eyeOfNewt",
            "solarCompass"
          ]
        },
        "hydra": {
          "detail": {
            "name": "Beryl and Basil Hydra",
            "role": "Bickering Duo",
            "bio": "The hydra is a fearsome 2 headed beast. They are surly, bad tempered and don't make many friends. Unfortunately they also don't get along with each other and aren't on speaking terms. Basil blames Beryl for losing something very important and will never let it go."
          },
          "inventory": {
            "eyeOfNewt": {
              "name": "Eye of Newt",
              "description": "You don't want to know."
            },
            "healingBalmOfBeryl": {
              "name": "Healing Balm of Beryl",
              "description": "A legendary salve known for its extraordinary restorative properties. Its crafted from a mix of rare healing herbs that grow in a dangerous forest, that only Hydras dare to venture. The recipe has been passed down for centuries to all Hydras who have notoriously rough skin."
            }
          },
          "wishlist": "arcaneLocket"
        },
        "shady": {
          "detail": {
            "name": "Shady Schemer",
            "role": "Conman",
            "bio": "It may seem like a good deal, but never turn your back on Shady. He is a master of manipulation and deception. He may have the part you need to repair your ship but he'll strip your ship for parts when you're not looking. But even terrible people have hobbies. Shady is an avid stargazer, but too bad his telescope is broken. He can't find anyone to make the repair because hardly anyone wants to do business with Shady."
          },
          "inventory": {
            "crimsonFeather": {
              "name": "Crimson Feather",
              "description": "A rare feather from an exotic bird, known for its vibrant red color and symbolic significance. When dipped in colored ink, it infuses the paint with magical properties. The resulting brushstrokes seem to come alive and produce the most beautiful works of art. Legend has it that it was plucked from the tail feathers of the bird by the Hydra's great-great-great-grandfather."
            },
            "arcaneLocket": {
              "name": "Arcane Locket",
              "descripton": "A delicate locket containing a hidden compartment that holds an old photograph of great-great-great-grandfather Hydra. It is very valuable but its highest value is sentimental."
            }
          },
          "wishlist": "wispfireLantern"
        },
        "taylor": {
          "detail": {
            "name": "Taylor Tuck",
            "role": "Tailor",
            "bio": "Tuck is a master tailor, capable of putting together the most beautiful garments from the most meager materials. However, years of pulling thread and handling rough fabrics have left his fingers raw and his joints stiff. He longs for a solution to alleviate his discomfort so he can continue his beloved craft."
          },
          "inventory": {
            "stealthStriders": {
              "name": "Stealth Striders",
              "description": "A pair of pants cut from a specialized cloth. It allows the wearer to have maximum agility and silent movement. They are durable and sleek in appearance and make your butt look great!"
            },
            "wispfireLantern": {
              "name": "Wispfire Lantern",
              "description": "A mystical lantern containing a captured wisp of elemental fire. When lit, it emits a warm, gentle glow and grants the bearer protection against darkness."
            }
          },
          "wishlist": "stealthStriders"
        },
        "violet": {
          "detail": {
            "name": "Violet Meadows",
            "role": "Botanist",
            "bio": "Violet is a delightful and dedicated botanist, who finds wonder in the enchanting realm of flora. She's a girl that always has dirt under her finger nails. With her expertise in plant identification, cultivation techniques, and conservation practices, her knowledge just may be the key to saving Barf's planet. Too bad she is super creeped out that he doesn't have pants."
          },
          "inventory": {
            "botanicalElixir": {
              "name": "Botanical Elixir",
              "description": "Also known as Whispering Bloom, Botanical Elixir was created centuries ago by a reclusive herbalist who possessed a deep connection with nature. Seeking to nurture and restore the balance of the natural world, and support a variety of life. Legend has spread across the galaxy, that when in the hands of a true lover of flora, it has helped reseed entire planets."
            },
            "starlightHarp": {
              "name": "Starlight Harp",
              "description": "A celestial musical instrument that resonates with the harmony of the cosmos. When played under a starry night sky, its ethereal melodies have the power to soothe hearts, inspire creativity, and even evoke celestial phenomena."
            }
          },
          "wishlist": "timekeepersPocketWatch"
        },
        "zara": {
          "detail": {
            "name": "Zara Sparks",
            "role": "Mechanic",
            "bio": "Zara is a spirited and skilled mechanic. She specializes in repairing machinery and always has a toolbox in her hand. She seems to know everything there is to know in the world of gears, engines and intricate machinery. Shes ready to retire and move to the countryside, but after years of hearing the hum and whir of machinery, its just too quiet and she cant sleep."
          },
          "inventory": {
            "gossamerGroveSpade": {
              "name": "Gossamer Grove Spade",
              "description": "A remarkable tool that harmonizes the art of gardening with a touch of enchantment. Crafted by an ancient order of mystical faeries, the spade gives the unique experience of effortlessly tending to beloved plants without the worry of breaking a nail or experiencing discomfort."
            },
            "aethericSpanner": {
              "name": "Aetheric Spanner",
              "description": "A unique tool that appears to be an ordinary wrench at first glance but possesses hidden mechanisms and modifications specifically designed for repairing intricate machinery found on futuristic spacecraft"
            }
          },
          "wishlist": "stellarScope"
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