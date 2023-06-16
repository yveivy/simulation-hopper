import { QUERY_INVENTORY, QUERY_ONE_ITEM_DETAILS } from "./queries";
import { QUERY_ONE_CHARACTER_DATA } from "./queries";
import client from "./apolloClient"

// export async function fetchResetInventoryData() {
//     try {
//         const { data } = await client.mutate({
//           mutation: ADD_THOUGHT,
//           variables: {
//             thoughtText: "This is a new thought",
//             thoughtAuthor: "Elon Musk"
//           },
//         });
//         console.log(data);
//       } catch (error) {
//         console.error(error);
//       }
// }

export async function fetchOneCharacterData(characterSearchableName) {
  try {
      const { data } = await client.query({
          query: QUERY_ONE_CHARACTER_DATA,
          variables: { searchableName: characterSearchableName }
      });
      console.log("fetchOneCharacterData__________", data.getOneCharacterInfo);
      return data.getOneCharacterInfo
  } catch (error) {
      console.error(error);
  }
}

export async function fetchOneItemDetails(itemSearchableName) {
  console.log("fetchOneItemDetails_______")
  try {
      const { data } = await client.query({ 
          query: QUERY_ONE_ITEM_DETAILS,
          variables: { searchableItem: itemSearchableName }
      });
      console.log("fetchOneItemDetails_______", data);
      return data
    } catch (error) {
      console.error(error);
    }
}

export async function fetchInventory(characterSearchableName) {
    try {
        const { data } = await client.query({ 
            query: QUERY_INVENTORY,
            variables: { searchableName: characterSearchableName }
        });
        console.log("fetchInventory_______", data.userSaveFile.inventory[characterSearchableName]);
        return data.userSaveFile.inventory[characterSearchableName]
      } catch (error) {
        console.error(error);
      }
}