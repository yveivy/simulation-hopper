import { fetchOpenAiApi, createPromptForNpcResponseToTradeRequest, createPromptForNpcResponseToChat } from './ai.js';
import { parseInventoryObjArrayToGetJustItems, retrieveInventoryData, renderInventoryItemDetailsInUl, findDescriptionBasedOnItemNameInJson, findIdBasedOnItemNameInJson, fetchResetInventoryData} from './inventory.js';

// var userInventory = ['duct tape', 'rusty knife', 'hair gel']
// var inventoryOfThisNpc = ['wrench', 'screws', 'shoelace']

export var globalVars = {
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
    offerQuestion: { type: "radio", text: "Offer to trade your:", choices: [...globalVars.userInventoryItems], when: globalVars.trade},
    receiveQuestion: { type: "radio", text: "In exchange for:", choices: [...globalVars.npcInventoryItems], when: globalVars.trade},
    chatQuestion: { type: "input", text: "Type to chat", when: globalVars.chat }
}

var interactionContainer = document.getElementById('interactionContainer');
var userInputContainer = document.getElementById('userInputContainer');
var dialogueContainer = document.getElementById('dialogueContainer');
var dialogueUl = document.getElementById('dialogueUl');
var npcBioContainer = document.getElementById('npcBioContainer')
var npcNameEl = document.querySelector("#npcName")
var npcHeadshotContainer = document.querySelector("#npcHeadshotContainer")

function getRadioInputValue() {
    let radios = document.querySelectorAll('[name="choice"]');
    let selectedValue;

    radios.forEach(radio => {
        if (radio.checked) {
            selectedValue = radio.value;
        }
    });

    return selectedValue; // this will be the value of the selected radio button
}

function getTextInputValue() {
    let textInputValue = document.querySelector("#chatInput").value
    return textInputValue
}

function askEitherQuestionType(currentQuestion) {
    if (currentQuestion.type === "input") {
        renderTextQuestion(currentQuestion)
    } else if (currentQuestion.type === "radio") {
        renderCheckBoxQuestion(currentQuestion)
    }
}

function renderTextQuestion(currentQuestion) {
    clearUserInputContainer()
    let questionText = createQuestionText(currentQuestion)
    userInputContainer.appendChild(questionText);

    let input = document.createElement('input');
    input.type = "text";
    input.id = "chatInput"
    userInputContainer.appendChild(input);   
}

function renderCheckBoxQuestion(currentQuestion) {
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

function clearUserInputContainer() {
    userInputContainer.innerHTML = ''
}
export function clearUl(ul) {
    ul.innerHTML = ''
}
function clearChatInput() {
    var chatInput = document.querySelector("#chatInput")
    chatInput.value = ""
}

function createQuestionText(currentQuestion) {
    let questionText = document.createElement('p');
    questionText.innerText = currentQuestion.text;
    return questionText
}

export function disableWASD() {
    WASDenabled = false;
}

export function enableWASD() {
    WASDenabled = true
}

function showInteractionContainer() {
    interactionContainer.style.display = 'flex';
}

function hideInteractionContainer() {
    interactionContainer.style.display = 'none';
}


function finishInteraction() {
    globalVars.currentQuestionIndex = 0
    globalVars.trade = false
    globalVars.chat = false
    globalVars.dialogueList = []
    globalVars.tradeRequestData = {}
    globalVars.npcDataObject = {}
    globalVars.npcInventoryItems = []
    globalVars.npcInventoryObjArray = []
    globalVars.userInventoryObjArray = []
    globalVars.userInventoryItems = []
    globalVars.chatInputValue = ''
    interactionObject = ''
    

    clearUl(dialogueUl)
    clearUserInputContainer()
    hideInteractionContainer()
}

function setInteractionModeFlag(interactionMode) {
    if (interactionMode == 'Trade') {
        globalVars.trade = true
    } else if (interactionMode == 'Chat') {
        globalVars.chat = true
    } else {
        console.log("Error in getting input value of first question")
    }
}


async function fetchCharacterData(characterSearchableName) {
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


function populateInteractionContainerWithNpcData(npcDataObject) {
    globalVars.npcDataObject.searchable_name = interactionObject

    npcNameEl.innerHTML = npcDataObject.full_name
    npcHeadshotContainer.style.backgroundImage = `url('../images/characterHeadshots/${npcDataObject.searchable_name}.png')`
    npcBioContainer.innerHTML = `Bio:  ${npcDataObject.bio}`
}

const endGameItems = ['Botanical Elixir ', 'Aetheric Spanner']




// var nextBtn = document.getElementById('nextButton')
window.addEventListener('keydown', async function(e) {
    retrieveInventoryData()
    const hasEndGameItems = endGameItems.every(item => globalVars.userInventoryItems.includes(item))
    if (e.key === ' ' && globalVars.currentQuestionIndex == 0 && interactionObject!='') {
        disableWASD()  
            if (interactionObject === 'Spaceship' && hasEndGameItems) {
                endGame()
                fetchResetInventoryData()
            } else if (interactionObject === 'Spaceship' && !hasEndGameItems){
                console.log("interactionMenu.js eventListener: You can't leave in your spaceship yet. You need to get something to restore the plantlife on your home planet and something to repair your ship.")
                //ToDo: render message on the screen to the effect of "You can't leave in your spaceship yet. You need to get something to restore plantlife on your planet and something to repair your ship."
                enableWASD()
                return
            }   
        globalVars.npcDataObject = await fetchCharacterData(interactionObject)
        populateInteractionContainerWithNpcData(globalVars.npcDataObject)
        showInteractionContainer()
        askEitherQuestionType(questionData.interactionModeQuestion)
        globalVars.currentQuestionIndex ++
    } else if (e.code === 'Enter' && globalVars.currentQuestionIndex == 1) {
        var interactionModeInputValue = getRadioInputValue()
        if (!interactionModeInputValue) {
            console.log("Tried to press enter before any input option selected")
            return
        }
        setInteractionModeFlag(interactionModeInputValue)
        if (globalVars.trade) {
            console.log('EventListener() trade chosen; userInventoryItems________',globalVars.userInventoryItems)
            askEitherQuestionType(questionData.offerQuestion)
            renderInventoryItemDetailsInUl(dialogueUl, globalVars.userInventoryObjArray)
        } else if (globalVars.chat) {
            askEitherQuestionType(questionData.chatQuestion)
        }
        globalVars.currentQuestionIndex ++ 
    } else if (e.code === 'Enter' && globalVars.chat && globalVars.currentQuestionIndex >= 2) { 
        globalVars.chatInputValue = getTextInputValue()
        if (globalVars.chatInputValue=="") {
            console.log("Tried to press enter before any input option selected")
            return
        }
        globalVars.dialogueList.push(`User: "${globalVars.chatInputValue}"`)
        globalVars.currentQuestionIndex ++
        processChatMessage(globalVars.chatInputValue)
    } else if (e.code === 'Enter' && globalVars.trade && globalVars.currentQuestionIndex == 2) {
        globalVars.tradeRequestData.itemOfferedByUser = getRadioInputValue()
        if (!globalVars.tradeRequestData.itemOfferedByUser) {
            console.log("Tried to press enter before any input option selected")
            return
        }
        askEitherQuestionType(questionData.receiveQuestion)
        clearUl(dialogueUl)
        renderInventoryItemDetailsInUl(dialogueUl, globalVars.npcInventoryObjArray)
        globalVars.currentQuestionIndex ++
    } else if (e.code === 'Enter' && globalVars.trade && globalVars.currentQuestionIndex == 3) {
        globalVars.tradeRequestData.itemRequestedByUser = getRadioInputValue()
        if (!globalVars.tradeRequestData.itemRequestedByUser) {
            console.log("Tried to press enter before any input option selected")
            return
        }
        globalVars.currentQuestionIndex ++ 
        clearUl(dialogueUl)
        processTradeOffer()
    } else if (e.code === 'Escape' && globalVars.currentQuestionIndex > 0) {
        console.log("interactionMenu.js eventListener escape-key__________")
        finishInteraction()
        enableWASD()
    }
});


function removeAnythingOutsideOfQuotes(unformattedStr) {
    let str = unformattedStr.match(/"(.*?)"/g).map(item => item.slice(1, -1));
    return str 
}

async function processChatMessage() {
    clearUl(dialogueUl)
    clearChatInput()
    var reqObj = createChatPromptFetchReqObj()
    var prompt = createPromptForNpcResponseToChat(reqObj)
    var unformattedPromptResponse = await fetchOpenAiApi(prompt)
    var promptResponse = removeAnythingOutsideOfQuotes(unformattedPromptResponse)
    var npcText = `${globalVars.npcDataObject.full_name}: "${promptResponse}"`
    globalVars.dialogueList.push(npcText)

    for (let line of globalVars.dialogueList) {
        appendLiToUl(dialogueUl, line)
    }
}

function formatDialogueListAsString() {
    var string = globalVars.dialogueList.join("\n")
    return string
}


function createChatPromptFetchReqObj() {
    var role = globalVars.npcDataObject.role
    var bio = globalVars.npcDataObject.bio
    var mostRecentMessage = globalVars.chatInputValue
    var chatHistory = formatDialogueListAsString()

    var chatPromptReqObj = {
        role: role,
        bio: bio,
        mostRecentMessage: mostRecentMessage,
        chatHistory: chatHistory
    }
    return chatPromptReqObj
}

function createTradeRequestPromptFetchReqObj() {
    var role = globalVars.npcDataObject.role
    var bio = globalVars.npcDataObject.bio
    var itemOfferedByUser = globalVars.tradeRequestData.itemOfferedByUser
    var itemRequestedByUser = globalVars.tradeRequestData.itemRequestedByUser
    var offerDecision = globalVars.tradeOfferDecision
    
    var userInventoryItemsStr = globalVars.userInventoryItems.join(", ")
    var npcInventoryItemsStr = globalVars.npcInventoryItems.join(", ")
    var descriptionOfItemOfferedByUser = findDescriptionBasedOnItemNameInJson(itemOfferedByUser, globalVars.userInventoryObjArray)
    var descriptionOfItemRequestedByUser = findDescriptionBasedOnItemNameInJson(itemRequestedByUser, globalVars.npcInventoryObjArray)

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


async function processTradeOffer() {
    globalVars.tradeOfferDecision = await fetchTradeOfferResponse()
    console.log("processTradeOffer() offerDecision________", globalVars.tradeOfferDecision)
    var reqObj = await createTradeRequestPromptFetchReqObj()
    var prompt = createPromptForNpcResponseToTradeRequest(reqObj)
    var promptResponse = await fetchOpenAiApi(prompt)
    var tradeSummary = `*User offers ${globalVars.tradeRequestData.itemOfferedByUser} in exchange for ${globalVars.tradeRequestData.itemRequestedByUser}.*`
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

async function fetchTradeOfferResponse() {
    var idOfitemOfferedByUser = findIdBasedOnItemNameInJson(globalVars.tradeRequestData.itemOfferedByUser, globalVars.userInventoryObjArray)
    var idOfItemRequestedByUser = findIdBasedOnItemNameInJson(globalVars.tradeRequestData.itemRequestedByUser, globalVars.npcInventoryObjArray)
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