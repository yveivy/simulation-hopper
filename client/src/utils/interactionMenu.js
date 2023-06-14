import { findDescriptionBasedOnItemNameInJson} from './inventory.js';
// // var userInventory = ['duct tape', 'rusty knife', 'hair gel']
// // var inventoryOfThisNpc = ['wrench', 'screws', 'shoelace']

window.globalVars = {
    inventoryToggledOn: false,
    trade: false,
    chat: false,
    currentQuestionIndex: 0,
    dialogueList: [],
    tradeRequestData: {},
    npcDataObject: {},
    npcInventoryItems: [],
    npcInventoryObjArray: [],
    userInventoryObjArray: [],
    userInventoryItems: [],
    chatInputValue: null,
    tradeOfferDecision: null
};

export var questionData = {
    interactionModeQuestion: { type: "radio", text: "", choices: ["Trade", "Chat"], when: true },
    offerQuestion: { type: "radio", text: "Offer to trade your:", choices: [...window.globalVars.userInventoryItems], when: window.globalVars.trade},
    receiveQuestion: { type: "radio", text: "In exchange for:", choices: [...window.globalVars.npcInventoryItems], when: window.globalVars.trade},
    chatQuestion: { type: "input", text: "Type to chat", when: window.globalVars.chat }
}

// var userInputContainer = document.getElementById('userInputContainer');
// var dialogueContainer = document.getElementById('dialogueContainer');
// var dialogueUl = document.getElementById('dialogueUl');
// var npcBioContainer = document.getElementById('npcBioContainer')
// var npcNameEl = document.querySelector("#npcName")
// var npcHeadshotContainer = document.querySelector("#npcHeadshotContainer")

export function disableWASD() {
    window.WASDenabled = false;
}

export function enableWASD() {
    window.WASDenabled = true
}


export function resetInteractionGlobalVars() {
    window.globalVars.currentQuestionIndex = 0
    window.globalVars.trade = false
    window.globalVars.chat = false
    window.globalVars.dialogueList = []
    window.globalVars.tradeRequestData = {}
    window.globalVars.npcDataObject = {}
    window.globalVars.npcInventoryItems = []
    window.globalVars.npcInventoryObjArray = []
    window.globalVars.userInventoryObjArray = []
    window.globalVars.userInventoryItems = []
    window.globalVars.chatInputValue = ''
    window.interactionObject = ''
}

export function setInteractionModeFlag(interactionMode) {
    if (interactionMode == 'Trade') {
        window.globalVars.trade = true
    } else if (interactionMode == 'Chat') {
        window.globalVars.chat = true
    } else {
        console.log("Error in getting input value of first question")
    }
}


export function removeAnythingOutsideOfQuotes(unformattedStr) {
    let str = unformattedStr.match(/"(.*?)"/g).map(item => item.slice(1, -1));
    return str 
}


export function formatDialogueListAsString() {
    var string = window.globalVars.dialogueList.join("\n")
    return string
}


export function createChatPromptFetchReqObj() {
    var role = window.globalVars.npcDataObject.role
    var bio = window.globalVars.npcDataObject.bio
    var mostRecentMessage = window.globalVars.chatInputValue
    var chatHistory = formatDialogueListAsString()

    var chatPromptReqObj = {
        role: role,
        bio: bio,
        mostRecentMessage: mostRecentMessage,
        chatHistory: chatHistory
    }
    return chatPromptReqObj
}

export function createTradeRequestPromptFetchReqObj() {
    var role = window.globalVars.npcDataObject.role
    var bio = window.globalVars.npcDataObject.bio
    var itemOfferedByUser = window.globalVars.tradeRequestData.itemOfferedByUser
    var itemRequestedByUser = window.globalVars.tradeRequestData.itemRequestedByUser
    var offerDecision = window.globalVars.tradeOfferDecision
    
    var userInventoryItemsStr = window.globalVars.userInventoryItems.join(", ")
    var npcInventoryItemsStr = window.globalVars.npcInventoryItems.join(", ")
    var descriptionOfItemOfferedByUser = findDescriptionBasedOnItemNameInJson(itemOfferedByUser, window.globalVars.userInventoryObjArray)
    var descriptionOfItemRequestedByUser = findDescriptionBasedOnItemNameInJson(itemRequestedByUser, window.globalVars.npcInventoryObjArray)

    var tradeReqPromptReqObj = {
        role: role,
        bio: bio,

        npcInventoryItems: npcInventoryItemsStr,
        userInventoryItems: userInventoryItemsStr,
        itemOfferedByUser: itemOfferedByUser,
        itemRequestedByUser: itemRequestedByUser,
        descriptionOfItemOfferedByUser: descriptionOfItemOfferedByUser,
        descriptionOfItemRequestedByUser: descriptionOfItemRequestedByUser,
        offerDecision: offerDecision
    }
    return tradeReqPromptReqObj
}



// // function createReqBodyToCheckTrade (itemOfferedByUser, itemRequestedByUser) {
// //     var tradeRequestData = {
// //         "itemOfferedByUser": itemOfferedByUser,
// //         "itemRequestedByUser": itemRequestedByUser
// //     }
// //     return reqBody
// // }

// // export async function fetchTradeOfferResponse() {
// //     try {
// //         const { data } = await client.mutate({
// //           mutation: ADD_THOUGHT,
// //           variables: {
// //             thoughtText: "This is a new thought",
// //             thoughtAuthor: "Elon Musk"
// //           },
// //         });
// //         console.log(data);
// //         return data
// //     } catch (error) {
// //         console.error(error);
// //     }
// // }