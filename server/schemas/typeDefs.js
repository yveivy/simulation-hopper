const { gql } = require('apollo-server-express');

const typeDefs = gql`

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

type Inventory {
  searchable_name: Character!
  searchable_item: Item!
}

type User {
  id: ID!
  username: String!
  email: String!
  password: String!
}

  type Query {
    test: String!
    biography(searchable_name: String!): Character!
    item(searchable_item: String!): Item!
    items: [Item]!
    inventoryByCharacter(character: String!): [Inventory]!
    inventory: [Inventory]!
  }

  type Mutation {
    trade(item1: String!, item2: String!): Inventory!
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
