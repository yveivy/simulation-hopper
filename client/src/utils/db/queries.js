import { gql } from '@apollo/client';

export const QUERY_INVENTORY = gql`
query Query {
  userSaveFile {
    characters {
      abe {
        inventory {
          key
          name
          description
        }
      }
      barf {
        inventory {
          key
          name
          description
        }
      }
      hydra {
        inventory {
          key
          name
          description
        }
      }
      shady {
        inventory {
          key
          name
          description
        }
      }
      taylor {
        inventory {
          key
          name
          description
        }
      }
      violet {
        inventory {
          key
          name
          description
        }
      }
      zara {
        inventory {
          key
          name
          description
        }
      }
    }
  }
}
`;

export const QUERY_CHARACTER_DATA = gql`
  query Characters {
    userSaveFile {
      characters {
        abe {
          detail {
            name
            bio
            role
          }
        }
        barf {
          detail {
            name
            bio
            role
          }
        }
        hydra {
          detail {
            name
            bio
            role
          }
        }
        shady {
          detail {
            name
            bio
            role
          }
        }
        taylor {
          detail {
            name
            bio
            role
          }
        }
        violet {
          detail {
            name
            bio
            role
          }
        }
        zara {
          detail {
            name
            bio
            role
          }
        }
      }
    }
  }
`;

// query CharacterData($characterSearchableName: String) {
//   characterData( characterSearchableName: $characterSearchableName ) {
//     full_name,
//     description,
//     inventory [],
//     wishlist
//   }

// query Inventory($characterSearchableName: String) {
//   inventory( characterSearchableName: $characterSearchableName ) {
//     inventory {
//       full_name,
//       description
//     }
//   }
// }