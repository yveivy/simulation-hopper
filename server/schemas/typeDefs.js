const { gql } = require('apollo-server-express');
const typeDefs = gql`
type Query {
  userSaveFile: userfile
  getAllCharacters: [Character]
  getOneCharacterInfo(searchable_name: String!): Character!
  getOneItem(searchable_item: String!): Item!
  getItems: [Item]!
}

type userfile {
  _id: ID
  userinfo: Userinfo
  playerLocation: PlayerLocParams
  inventory: CharacterInventories
  token: String
}

type Userinfo {
  username: String
  password: String
}

type PlayerLocParams {
  x: Int
  y: Int
}

type CharacterInventories {
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
    tradeWith: String!
    barfGives: String!
    barfGets: String!
  ): userfile
  markCharacterAsMet(characterName: String!): Boolean
  createNewUser(username: String!, password: String!): userfile!
  userLogIn(username: String!, password: String!): userfile!
}

type Character {
  searchable_name: String
  full_name: String
  role: String
  bio: String
}

type Item {
  searchable_item: String
  item_name: String
  description: String
}

`;
module.exports = typeDefs;
