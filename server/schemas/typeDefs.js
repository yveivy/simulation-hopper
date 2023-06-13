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
  characters: Character
}

type Userinfo {
  username: String
  password: String
}

type Character {
  abe: CharacterObject!
  barf: CharacterObject!
  hydra: CharacterObject!
  shady: CharacterObject!
  taylor: CharacterObject!
  violet: CharacterObject!
  zara: CharacterObject!
}

type CharacterObject {
  detail: CharacterDetail
  inventory: [InventoryItem]
  wishlist: String
}

type CharacterDetail {
  bio: String
  name: String
  role: String
}

type InventoryItem {
  key: String
  description: String
  name: String
}

type InventoryContainer {
  allItems: InventoryItem
}




`;

module.exports = typeDefs;
