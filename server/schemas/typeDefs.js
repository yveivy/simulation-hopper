
const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
  userSaveFile: Collection
}

type Character { 
  searchable_name: String!
  full_name: String!
  role: String!
  bio: String!
  }

type Item {
  searchable_item: String!
  item_name: String!
  description: String!
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

type Query {
    test: String!
    biography(searchable_name: String!): Character!
    item(searchable_item: String!): Item!
    items: [Item]!
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

type Mutation {
  tradeItems(
    characterName: String!
    tradeWith: String!
    itemToTrade: String!
    itemToAcquire: String!
  ): Collection
}


module.exports = typeDefs;
