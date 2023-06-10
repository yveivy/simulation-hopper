import { fetchOpenAiApi, createPromptForNpcResponseToTradeRequest, createPromptForNpcResponseToChat } from './ai.js';


// var userInventory = ['duct tape', 'rusty knife', 'hair gel']
// var inventoryOfThisNpc = ['wrench', 'screws', 'shoelace']
var trade = false
var chat = false
var currentQuestionIndex = 0;
var dialogueList = []
var tradeRequestData = {}
var npcDataObject = {}
var npcInventoryItems = []
var npcInventoryObjArray = []
var userInventoryObjArray = []
var userInventoryItems = []
var chatInputValue;
var tradeOfferDecision;

const interactionModeQuestion = { type: "radio", text: "", choices: ["Trade", "Chat"], when: true }
const offerQuestion = { type: "radio", text: "Offer to trade your:", choices: [...userInventoryItems], when: trade}
const receiveQuestion = { type: "radio", text: "In exchange for:", choices: [...npcInventoryItems], when: trade}
const chatQuestion = { type: "input", text: "Type to chat", when: chat }


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
function clearDialogueUl() {
    dialogueUl.innerHTML = ''
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

function disableWASD() {
    WASDenabled = false;
}

function enableWASD() {
    WASDenabled = true
}

function showInteractionContainer() {
    interactionContainer.style.display = 'flex';
}

function hideInteractionContainer() {
    interactionContainer.style.display = 'none';
}

function finishInteraction() {
    currentQuestionIndex = 0
    trade = false
    chat = false
    dialogueList = []
    tradeRequestData = {}
    npcDataObject = {}
    npcInventoryItems = []
    npcInventoryObjArray = []
    userInventoryObjArray = []
    userInventoryItems = []
    chatInputValue = ''
    interactionObject = ''

    clearDialogueUl()
    clearUserInputContainer()
    hideInteractionContainer()
}

function setInteractionModeFlag(interactionMode) {
    if (interactionMode == 'Trade') {
        trade = true
    } else if (interactionMode == 'Chat') {
        chat = true
    } else {
        console.log("Error in getting input value of first question")
    }
}

async function fetchInventory(characterSearchableName) {
    try {
        const response = await fetch(`/api/gamedata/inventory/${characterSearchableName}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const inventory = await response.json();
        return inventory;
    } catch (e) {
        console.log('There was a problem with your fetch operation: ' + e.message);
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
    npcDataObject.searchable_name = interactionObject

    npcNameEl.innerHTML = npcDataObject.full_name
    npcHeadshotContainer.style.backgroundImage = `url('../images/characterHeadshots/${npcDataObject.searchable_name}.png')`
    npcBioContainer.innerHTML = `Bio:  ${npcDataObject.bio}`
}

const endGameItems = ['Botanical Elixir ', 'Aetheric Spanner']


function parseInventoryObjArrayToGetJustItems(inventoryObjArray) {
    var inventoryItems = []
    for (var item of inventoryObjArray) {
        var name = item.item.item_name
        inventoryItems.push(name)
    }
    return inventoryItems
}

async function retrieveInventoryData() {
    npcInventoryObjArray = await fetchInventory(interactionObject)
    userInventoryObjArray = await fetchInventory('barf')
    npcInventoryItems = parseInventoryObjArrayToGetJustItems(npcInventoryObjArray)
    receiveQuestion.choices = [...npcInventoryItems]
    userInventoryItems = parseInventoryObjArrayToGetJustItems(userInventoryObjArray)
    offerQuestion.choices = [...userInventoryItems]
}


// var nextBtn = document.getElementById('nextButton')
window.addEventListener('keydown', async function(e) {
    retrieveInventoryData()
    const hasEndGameItems = endGameItems.every(item => userInventoryItems.includes(item))
    if (e.key === ' ' && currentQuestionIndex == 0 && interactionObject!='') {
        disableWASD()  
            if (interactionObject === 'Spaceship' && hasEndGameItems) {
                endGame()} else if(interactionObject === 'Spaceship' || interactionObject === ''){
                return
                }   
        npcDataObject = await fetchCharacterData(interactionObject)
        populateInteractionContainerWithNpcData(npcDataObject)
        showInteractionContainer()
        askEitherQuestionType(interactionModeQuestion)
        currentQuestionIndex ++
    } else if (e.code === 'Enter' && currentQuestionIndex == 1) {
        var interactionModeInputValue = getRadioInputValue()
        if (!interactionModeInputValue) {
            console.log("Tried to press enter before any input option selected")
            return
        }
        setInteractionModeFlag(interactionModeInputValue)
        if (trade) {
            console.log('EventListener() trade chosen; userInventoryItems________',userInventoryItems)
            askEitherQuestionType(offerQuestion)
            renderInventoryItemDetailsInDialogueUl(userInventoryObjArray)
        } else if (chat) {
            askEitherQuestionType(chatQuestion)
        }
        currentQuestionIndex ++ 
    } else if (e.code === 'Enter' && chat && currentQuestionIndex >= 2) { 
        chatInputValue = getTextInputValue()
        if (chatInputValue=="") {
            console.log("Tried to press enter before any input option selected")
            return
        }
        dialogueList.push(`User: "${chatInputValue}"`)
        currentQuestionIndex ++
        processChatMessage(chatInputValue)
    } else if (e.code === 'Enter' && trade && currentQuestionIndex == 2) {
        tradeRequestData.itemOfferedByUser = getRadioInputValue()
        if (!tradeRequestData.itemOfferedByUser) {
            console.log("Tried to press enter before any input option selected")
            return
        }
        askEitherQuestionType(receiveQuestion)
        clearDialogueUl()
        renderInventoryItemDetailsInDialogueUl(npcInventoryObjArray)
        currentQuestionIndex ++
    } else if (e.code === 'Enter' && trade && currentQuestionIndex == 3) {
        tradeRequestData.itemRequestedByUser = getRadioInputValue()
        if (!tradeRequestData.itemRequestedByUser) {
            console.log("Tried to press enter before any input option selected")
            return
        }
        currentQuestionIndex ++ 
        clearDialogueUl()
        processTradeOffer()
    } else if (e.code === 'Escape' && currentQuestionIndex > 0) {
        finishInteraction()

        console.log("eventListener enableWASD()__________")
        enableWASD()
    }
});


function removeAnythingOutsideOfQuotes(unformattedStr) {
    let str = unformattedStr.match(/"(.*?)"/g).map(item => item.slice(1, -1));
    return str 
}

function renderInventoryItemDetailsInDialogueUl(inventory) {
    for (var item of inventory) {
        var name = item.item.item_name
        var description = item.item.description

        appendLiToDialogueUl(`Item name: ${name}`)
        appendLiToDialogueUl(`Description: ${description}`)
        appendLiToDialogueUl("&nbsp;")
    }
}

async function processChatMessage() {
    clearDialogueUl()
    clearChatInput()
    var reqObj = createChatPromptFetchReqObj()
    var prompt = createPromptForNpcResponseToChat(reqObj)
    var unformattedPromptResponse = await fetchOpenAiApi(prompt)
    var promptResponse = removeAnythingOutsideOfQuotes(unformattedPromptResponse)
    var npcText = `${npcDataObject.full_name}: "${promptResponse}"`
    dialogueList.push(npcText)

    for (let line of dialogueList) {
        appendLiToDialogueUl(line)
    }
}

function formatDialogueListAsString() {
    var string = dialogueList.join("\n")
    return string
}

function findDescriptionBasedOnItemNameInJson(itemNameToSearch, objArray) {
    // console.log("findDescriptionBasedOnItemNameInJson() itemNameToSearch and objArray_________",itemNameToSearch, objArray)
    let foundItemObj = objArray.find(itemObj => itemObj.item.item_name === itemNameToSearch);
    let foundDescription = foundItemObj.item.description
    console.log("findDescriptionBasedOnItemNameInJson() foundDescription",foundDescription)
    return foundDescription
}

function findIdBasedOnItemNameInJson(itemNameToSearch, objArray) {
    console.log("findIdBasedOnItemNameInJson() objArray",objArray)
    // console.log("findDescriptionBasedOnItemNameInJson() itemNameToSearch and objArray_________",itemNameToSearch, objArray)
    let foundItemObj = objArray.find(itemObj => itemObj.item.item_name === itemNameToSearch);
    let foundId = foundItemObj.item.item_id
    console.log("findIdBasedOnItemNameInJson() foundId",foundId)
    return foundId
}


function createChatPromptFetchReqObj() {
    var role = npcDataObject.role
    var bio = npcDataObject.bio
    var mostRecentMessage = chatInputValue
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
    var role = npcDataObject.role
    var bio = npcDataObject.bio
    var itemOfferedByUser = tradeRequestData.itemOfferedByUser
    var itemRequestedByUser = tradeRequestData.itemRequestedByUser

    var userInventoryItemsStr = userInventoryItems.join(", ")
    var npcInventoryItemsStr = npcInventoryItems.join(", ")
    var descriptionOfItemOfferedByUser = findDescriptionBasedOnItemNameInJson(itemOfferedByUser, userInventoryObjArray)
    var descriptionOfItemRequestedByUser = findDescriptionBasedOnItemNameInJson(itemRequestedByUser, npcInventoryObjArray)

    var tradeReqPromptReqObj = {
        role: role,
        bio: bio,

        npcInventoryItems: npcInventoryItemsStr,
        userInventoryItems: userInventoryItemsStr,
        itemOfferedByUser: itemOfferedByUser,
        itemRequestedByUser: itemRequestedByUser,
        descriptionOfItemOfferedByUser: descriptionOfItemOfferedByUser,
        descriptionOfItemRequestedByUser: descriptionOfItemRequestedByUser,
        offerDecision: tradeOfferDecision
    }
    return tradeReqPromptReqObj
}


async function processTradeOffer() {
    tradeOfferDecision = await fetchTradeOfferResponse()
    console.log("processTradeOffer() offerDecision________", tradeOfferDecision)
    var reqObj = await createTradeRequestPromptFetchReqObj()
    var prompt = createPromptForNpcResponseToTradeRequest(reqObj)
    var promptResponse = await fetchOpenAiApi(prompt)
    var tradeSummary = `*User offers ${tradeRequestData.itemOfferedByUser} in exchange for ${tradeRequestData.itemRequestedByUser}.*`
    var dialogueText = `NPC: ${promptResponse}`
    appendLiToDialogueUl(tradeSummary)
    appendLiToDialogueUl(dialogueText)
    clearUserInputContainer()
    // appendTradeOfferSummaryToUserInputContainer:
}

function appendLiToDialogueUl(text) {
    var li = document.createElement("li")
    li.innerHTML = text
    dialogueUl.appendChild(li)
}

// function createReqBodyToCheckTrade (itemOfferedByUser, itemRequestedByUser) {
//     var tradeRequestData = {
//         "itemOfferedByUser": itemOfferedByUser,
//         "itemRequestedByUser": itemRequestedByUser
//     }
//     return reqBody
// }

async function fetchTradeOfferResponse() {
    var idOfitemOfferedByUser = findIdBasedOnItemNameInJson(tradeRequestData.itemOfferedByUser, userInventoryObjArray)
    var idOfItemRequestedByUser = findIdBasedOnItemNameInJson(tradeRequestData.itemRequestedByUser, npcInventoryObjArray)
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