import { gql } from '@apollo/client';


// export function createTradeRequestPromptFetchReqObj() {
//   var role = window.globalVars.npcDataObject.role
//   var bio = window.globalVars.npcDataObject.bio
//   var itemOfferedByUser = window.globalVars.tradeRequestData.itemOfferedByUser
//   var itemRequestedByUser = window.globalVars.tradeRequestData.itemRequestedByUser
//   var offerDecision = window.globalVars.tradeOfferDecision
  
//   var userInventoryItemsStr = window.globalVars.userInventoryItems.join(", ")
//   var npcInventoryItemsStr = window.globalVars.npcInventoryItems.join(", ")
//   var descriptionOfItemOfferedByUser = findDescriptionBasedOnItemNameInJson(itemOfferedByUser, window.globalVars.userInventoryObjArray)
//   var descriptionOfItemRequestedByUser = findDescriptionBasedOnItemNameInJson(itemRequestedByUser, window.globalVars.npcInventoryObjArray)

//   var tradeReqPromptReqObj = {
//       role: role,
//       bio: bio,

//       npcInventoryItems: npcInventoryItemsStr,
//       userInventoryItems: userInventoryItemsStr,
//       itemOfferedByUser: itemOfferedByUser,
//       itemRequestedByUser: itemRequestedByUser,
//       descriptionOfItemOfferedByUser: descriptionOfItemOfferedByUser,
//       descriptionOfItemRequestedByUser: descriptionOfItemRequestedByUser,
//       offerDecision: offerDecision
//   }
//   return tradeReqPromptReqObj
// }

export const CREATE_TRADE_OFFER = gql`
  mutation createVote($_id: String!, $techNum: Int!) {
    createVote(_id: $_id, techNum: $techNum) {

    }
  }
`;

export async function fetchTradeOfferResponse() {
  var idOfitemOfferedByUser = findIdBasedOnItemNameInJson(window.globalVars.tradeRequestData.itemOfferedByUser, window.globalVars.userInventoryObjArray)
  var idOfItemRequestedByUser = findIdBasedOnItemNameInJson(window.globalVars.tradeRequestData.itemRequestedByUser, window.globalVars.npcInventoryObjArray)
  var responseToTradeOffer = await fetch(`/api/gamedata/trade/${idOfItemRequestedByUser}/${idOfitemOfferedByUser}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      }
  })
  var offerDecisionObj = await responseToTradeOffer.json()
  var offerDecision = offerDecisionObj.offerDecision
  console.log("fetchTradeOfferResponse() offerDecision________", offerDecision)
  return offerDecision
}


// export function createChatPromptFetchReqObj() {
//   var role = window.globalVars.npcDataObject.role
//   var bio = window.globalVars.npcDataObject.bio
//   var mostRecentMessage = window.globalVars.chatInputValue
//   var chatHistory = formatDialogueListAsString()

//   var chatPromptReqObj = {
//       role: role,
//       bio: bio,
//       mostRecentMessage: mostRecentMessage,
//       chatHistory: chatHistory
//   }
//   return chatPromptReqObj
// }

export const CREATE_GAME_RESET = gql`
  mutation createVote($_id: String!, $techNum: Int!) {
    createVote(_id: $_id, techNum: $techNum) {
      
    }
  }
`;

// export async function fetchResetInventoryData() {
//   try {
//       const response = await fetch(`api/gamedata/reset-inventory/${userName}`, {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json'
//           }
//       });

//       if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log(data);
//       return data;
//   } catch (error) {
//       console.error('Error:', error);
//   }
// }
