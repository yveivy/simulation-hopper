import { gql } from '@apollo/client';

export const QUERY_ONE_ITEM_DETAILS = gql`
query Query($searchableItem: String!) {
  getOneItem(searchable_item: $searchableItem) {
    description
    item_name
  }
}`

export const QUERY_INVENTORY = gql`
query Query {
  userSaveFile {
    inventory {
      abe {
        balm
        compass
        elixir
        feather
        harp
        lantern
        locket
        logBook
        medicalKit
        newt
        pocketWatch
        scope
        spade
        spanner
        striders
        translator
      },
      barf {
        balm
        compass
        elixir
        feather
        harp
        lantern
        locket
        logBook
        medicalKit
        newt
        pocketWatch
        scope
        spade
        spanner
        striders
        translator
      },
      hydra {
        balm
        compass
        elixir
        feather
        harp
        lantern
        locket
        logBook
        medicalKit
        newt
        pocketWatch
        scope
        spade
        spanner
        striders
        translator
      },
      shady {
        balm
        compass
        elixir
        feather
        harp
        lantern
        locket
        logBook
        medicalKit
        newt
        pocketWatch
        scope
        spade
        spanner
        striders
        translator
      },
      taylor {
        balm
        compass
        elixir
        feather
        harp
        lantern
        locket
        logBook
        medicalKit
        newt
        pocketWatch
        scope
        spade
        spanner
        striders
        translator
      },
      violet {
        balm
        compass
        elixir
        feather
        harp
        lantern
        locket
        logBook
        medicalKit
        newt
        pocketWatch
        scope
        spade
        spanner
        striders
        translator
      },
      zara {
        balm
        compass
        elixir
        feather
        harp
        lantern
        locket
        logBook
        medicalKit
        newt
        pocketWatch
        scope
        spade
        spanner
        striders
        translator
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