import { QUERY_INVENTORY } from "./queries";
import { QUERY_CHARACTER_DATA } from "./queries";
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

export async function fetchInventory(characterSearchableName) {
    try {
        const { data } = await client.query({ 
            query: QUERY_INVENTORY,
            variables: { searchableName: characterSearchableName }
        });
        console.log("fetchInventory")
        console.log("fetchInventory_______", data);
        return data
      } catch (error) {
        console.error(error);
      }
}