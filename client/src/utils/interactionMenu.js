import { fetchOpenAiApi, createPromptForNpcResponseToTradeRequest, createPromptForNpcResponseToChat } from './ai.js';
import { parseInventoryObjArrayToGetJustItems, retrieveInventoryData, renderInventoryItemDetailsInUl, findDescriptionBasedOnItemNameInJson, findIdBasedOnItemNameInJson, fetchResetInventoryData} from './inventory.js';

// var userInventory = ['duct tape', 'rusty knife', 'hair gel']
// var inventoryOfThisNpc = ['wrench', 'screws', 'shoelace']

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

var interactionContainer = document.getElementById('interactionContainer');
var userInputContainer = document.getElementById('userInputContainer');
var dialogueContainer = document.getElementById('dialogueContainer');
var dialogueUl = document.getElementById('dialogueUl');
var npcBioContainer = document.getElementById('npcBioContainer')
var npcNameEl = document.querySelector("#npcName")
var npcHeadshotContainer = document.querySelector("#npcHeadshotContainer")

export function getRadioInputValue() {
    let radios = document.querySelectorAll('[name="choice"]');
    let selectedValue;

    radios.forEach(radio => {
        if (radio.checked) {
            selectedValue = radio.value;
        }
    });

    return selectedValue; // this will be the value of the selected radio button
}

export function getTextInputValue() {
    let textInputValue = document.querySelector("#chatInput").value
    return textInputValue
}

export function askEitherQuestionType(currentQuestion) {
    if (currentQuestion.type === "input") {
        renderTextQuestion(currentQuestion)
    } else if (currentQuestion.type === "radio") {
        renderCheckBoxQuestion(currentQuestion)
    }
}

export function renderTextQuestion(currentQuestion) {
    clearUserInputContainer()
    let questionText = createQuestionText(currentQuestion)
    userInputContainer.appendChild(questionText);

    let input = document.createElement('input');
    input.type = "text";
    input.id = "chatInput"
    userInputContainer.appendChild(input);   
}

export function renderCheckBoxQuestion(currentQuestion) {
    clearUserInputContainer()
    let questionText = createQuestionText(currentQuestion)
    userInputContainer.appendChild(questionText);

    currentQuestion.choices.forEach(choice => {
        let label = document.createElement('label');

        let radio = document.createElement('input');
        radio.type = "radio";
        radio.value = choice;
        radio.name = "choice"
        label.appendChild(radio);

        let choiceText = document.createTextNode(choice);
        label.appendChild(choiceText);

        userInputContainer.appendChild(label);
    });
}

export function clearUserInputContainer() {
    userInputContainer.innerHTML = ''
}
export function clearUl(ul) {
    ul.innerHTML = ''
}
export function clearChatInput() {
    var chatInput = document.querySelector("#chatInput")
    chatInput.value = ""
}

export function createQuestionText(currentQuestion) {
    let questionText = document.createElement('p');
    questionText.innerText = currentQuestion.text;
    return questionText
}

export function disableWASD() {
    window.WASDenabled = false;
}

export function enableWASD() {
    window.WASDenabled = true
}

export function showInteractionContainer() {
    interactionContainer.style.display = 'flex';
}

export function hideInteractionContainer() {
    interactionContainer.style.display = 'none';
}


export function finishInteraction() {
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
    

    clearUl(dialogueUl)
    clearUserInputContainer()
    hideInteractionContainer()
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


export async function fetchCharacterData(characterSearchableName) {
    try {
        const response = await fetch(`/api/gamedata/biography/${characterSearchableName}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const npcData = await response.json();
        return npcData;
    } catch (e) {
        console.log('There was a problem with your fetch operation: ' + e.message);
    }
}


export function populateInteractionContainerWithNpcData(npcDataObject) {
    window.globalVars.npcDataObject.searchable_name = window.interactionObject

    npcNameEl.innerHTML = npcDataObject.full_name
    npcHeadshotContainer.style.backgroundImage = `url('../images/characterHeadshots/${npcDataObject.searchable_name}.png')`
    npcBioContainer.innerHTML = `Bio:  ${npcDataObject.bio}`
}




// var nextBtn = document.getElementById('nextButton')
window.addEventListener('keydown', async function(e) {
    if (e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd') {
        return
    }
    retrieveInventoryData()
    const endGameItems = ['Botanical Elixir ', 'Aetheric Spanner']
    const hasEndGameItems = endGameItems.every(item => window.globalVars.userInventoryItems.includes(item))
    if (e.key === ' ' && window.globalVars.currentQuestionIndex == 0 && window.interactionObject!='') {
        disableWASD()  
            if (window.interactionObject === 'Spaceship' && hasEndGameItems) {
                // endGame()
                fetchResetInventoryData()
            } else if (window.interactionObject === 'Spaceship' && !hasEndGameItems){
                console.log("interactionMenu.js eventListener: You can't leave in your spaceship yet. You need to get something to restore the plantlife on your home planet and something to repair your ship.")
                //ToDo: render message on the screen to the effect of "You can't leave in your spaceship yet. You need to get something to restore plantlife on your planet and something to repair your ship."
                enableWASD()
                return
            }   
        window.globalVars.npcDataObject = await fetchCharacterData(window.interactionObject)
        populateInteractionContainerWithNpcData(window.globalVars.npcDataObject)
        showInteractionContainer()
        askEitherQuestionType(questionData.interactionModeQuestion)
        window.globalVars.currentQuestionIndex ++
    } else if (e.code === 'Enter' && window.globalVars.currentQuestionIndex == 1) {
        var interactionModeInputValue = getRadioInputValue()
        if (!interactionModeInputValue) {
            console.log("Tried to press enter before any input option selected")
            return
        }
        setInteractionModeFlag(interactionModeInputValue)
        if (window.globalVars.trade) {
            console.log('EventListener() trade chosen; userInventoryItems________',window.globalVars.userInventoryItems)
            askEitherQuestionType(questionData.offerQuestion)
            renderInventoryItemDetailsInUl(dialogueUl, window.globalVars.userInventoryObjArray)
        } else if (window.globalVars.chat) {
            askEitherQuestionType(questionData.chatQuestion)
        }
        window.globalVars.currentQuestionIndex ++ 
    } else if (e.code === 'Enter' && window.globalVars.chat && window.globalVars.currentQuestionIndex >= 2) { 
        window.globalVars.chatInputValue = getTextInputValue()
        if (window.globalVars.chatInputValue=="") {
            console.log("Tried to press enter before any input option selected")
            return
        }
        window.globalVars.dialogueList.push(`User: "${window.globalVars.chatInputValue}"`)
        window.globalVars.currentQuestionIndex ++
        processChatMessage(window.globalVars.chatInputValue)
    } else if (e.code === 'Enter' && window.globalVars.trade && window.globalVars.currentQuestionIndex == 2) {
        window.globalVars.tradeRequestData.itemOfferedByUser = getRadioInputValue()
        if (!window.globalVars.tradeRequestData.itemOfferedByUser) {
            console.log("Tried to press enter before any input option selected")
            return
        }
        askEitherQuestionType(questionData.receiveQuestion)
        clearUl(dialogueUl)
        renderInventoryItemDetailsInUl(dialogueUl, window.globalVars.npcInventoryObjArray)
        window.globalVars.currentQuestionIndex ++
    } else if (e.code === 'Enter' && window.globalVars.trade && window.globalVars.currentQuestionIndex == 3) {
        window.globalVars.tradeRequestData.itemRequestedByUser = getRadioInputValue()
        if (!window.globalVars.tradeRequestData.itemRequestedByUser) {
            console.log("Tried to press enter before any input option selected")
            return
        }
        window.globalVars.currentQuestionIndex ++ 
        clearUl(dialogueUl)
        processTradeOffer()
    } else if (e.code === 'Escape' && window.globalVars.currentQuestionIndex > 0) {
        console.log("interactionMenu.js eventListener escape-key__________")
        finishInteraction()
        enableWASD()
    }
});


export function removeAnythingOutsideOfQuotes(unformattedStr) {
    let str = unformattedStr.match(/"(.*?)"/g).map(item => item.slice(1, -1));
    return str 
}

export async function processChatMessage() {
    clearUl(dialogueUl)
    clearChatInput()
    var reqObj = createChatPromptFetchReqObj()
    var prompt = createPromptForNpcResponseToChat(reqObj)
    var unformattedPromptResponse = await fetchOpenAiApi(prompt)
    var promptResponse = removeAnythingOutsideOfQuotes(unformattedPromptResponse)
    var npcText = `${window.globalVars.npcDataObject.full_name}: "${promptResponse}"`
    window.globalVars.dialogueList.push(npcText)

    for (let line of window.globalVars.dialogueList) {
        appendLiToUl(dialogueUl, line)
    }
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


export async function processTradeOffer() {
    window.globalVars.tradeOfferDecision = await fetchTradeOfferResponse()
    console.log("processTradeOffer() offerDecision________", window.globalVars.tradeOfferDecision)
    var reqObj = await createTradeRequestPromptFetchReqObj()
    var prompt = createPromptForNpcResponseToTradeRequest(reqObj)
    var promptResponse = await fetchOpenAiApi(prompt)
    var tradeSummary = `*User offers ${window.globalVars.tradeRequestData.itemOfferedByUser} in exchange for ${window.globalVars.tradeRequestData.itemRequestedByUser}.*`
    var dialogueText = `NPC: ${promptResponse}`
    appendLiToUl(dialogueUl, tradeSummary)
    appendLiToUl(dialogueUl, dialogueText)
    clearUserInputContainer()
    // appendTradeOfferSummaryToUserInputContainer:
}

export function appendLiToUl(ul, text) {
    var li = document.createElement("li")
    li.innerHTML = text
    ul.appendChild(li)
}

// function createReqBodyToCheckTrade (itemOfferedByUser, itemRequestedByUser) {
//     var tradeRequestData = {
//         "itemOfferedByUser": itemOfferedByUser,
//         "itemRequestedByUser": itemRequestedByUser
//     }
//     return reqBody
// }

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