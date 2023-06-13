import { gql } from '@apollo/client';

export const QUERY_INVENTORY = gql`
  query Inventory($characterSearchableName: String) {
    inventory( characterSearchableName: $characterSearchableName ) {
      inventory {
        full_name,
        description
      }
    }
  }
`;

export const QUERY_CHARACTER_DATA = gql`
  query CharacterData($characterSearchableName: String) {
    characterData( characterSearchableName: $characterSearchableName ) {
      full_name,
      description,
      inventory [],
      wishlist
    }
  }
`;