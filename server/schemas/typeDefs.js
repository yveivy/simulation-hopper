// const { gql } = require('apollo-server-express');

// const typeDefs = gql`

//   type Character {
//     character_id: Int!
//     searchable_name: String!
//     full_name: String!
//     role: String!
//     bio: String!
//   }


//   type Query {
//     test: String!
//     biography(searchableName: String!): Character!
//   }

//   type Item {
//     item_id: Int!
//     searchable_item: String!
//     item_name: String!
//     description: String!
//   }

//   type Query {
//     test: String!
//     item(searchableItem: String!): Item!
//     items: [Item]!
//   }

//   type Inventory {
//     full_name: Character!
//     item_name: Item!
//   }

//   type Query {
//     test: String!
//     inventoryByCharacter(character: String!): [Inventory]!
//     inventory: [Inventory]!
//   }

//   type Mutation {
//     trade(item1: String!, item2: String!): Inventory!
//   }

//   type User {
//     id: ID!
//     username: String!
//     email: String!
//     password: String!
//   }

//   type Mutation {
//     createUser(username: String!, email: String!, password: String!): User!
//     loginUser(email: String!, password: String!): User!
//     logoutUser: Boolean!
//   }

//   schema {
//     query: Query
//     mutation: Mutation
//   }
// `;

// module.exports = typeDefs;



// ==============
// comment out everything above this line to use J typedefs


const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
  userSaveFile: Collection
}

type Collection {
  _id: ID
  userinfo: Userinfo
  playerLocation: PlayerLocParams
  inventory: Character
}

type Userinfo {
  username: String
  password: String
}

type PlayerLocParams {
  x: Int
  y: Int
}

type Character {
  abe: InventoryObject
  barf: InventoryObject
  hydra: InventoryObject
  shady: InventoryObject
  taylor: InventoryObject
  violet: InventoryObject
  zara: InventoryObject
}


type InventoryObject {
  hasMet: Boolean
  balm: Boolean
  compass: Boolean
  elixir: Boolean
  feather: Boolean
  harp: Boolean
  lantern: Boolean
  logBook: Boolean
  locket: Boolean
  medicalKit: Boolean
  newt: Boolean
  pocketWatch: Boolean
  scope: Boolean
  spanner: Boolean
  spade: Boolean
  striders: Boolean
  translator: Boolean
}



`;

module.exports = typeDefs;
