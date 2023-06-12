const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Character {
    character_id: Int!
    searchable_name: String!
    full_name: String!
    role: String!
    bio: String!
  }


  type Query {
    test: String!
    biography(searchableName: String!): Character!
  }

  type Item {
    item_id: Int!
    searchable_item: String!
    item_name: String!
    description: String!
  }

  type Query {
    test: String!
    item(searchableItem: String!): Item!
    items: [Item]!
  }

  type Inventory {
    full_name: Character!
    item_name: Item!
  }

  type Query {
    test: String!
    inventoryByCharacter(character: String!): [Inventory]!
    inventory: [Inventory]!
  }

  type Mutation {
    trade(item1: String!, item2: String!): Inventory!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
    loginUser(email: String!, password: String!): User!
    logoutUser: Boolean!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = typeDefs;
