import { globalVars, questionData } from "./interactionMenu.js";
import { appendLiToUl, disableWASD, enableWASD, clearUl} from "./interactionMenu.js";
var inventoryContainer = document.querySelector("#inventory-container")
var inventoryUl = document.querySelector("#inventory-ul")

export async function fetchResetInventoryData() {
    try {
        const response = await fetch('api/gamedata/reset-inventory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function fetchInventory(characterSearchableName) {
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

export function parseInventoryObjArrayToGetJustItems(inventoryObjArray) {
    var inventoryItems = []
    for (var item of inventoryObjArray) {
        var name = item.item.item_name
        inventoryItems.push(name)
    }
    return inventoryItems
}

export async function retrieveInventoryData() {
    globalVars.npcInventoryObjArray = await fetchInventory(interactionObject)
    globalVars.userInventoryObjArray = await fetchInventory('barf')
    globalVars.npcInventoryItems = parseInventoryObjArrayToGetJustItems(globalVars.npcInventoryObjArray)
    questionData.receiveQuestion.choices = [...globalVars.npcInventoryItems]
    globalVars.userInventoryItems = parseInventoryObjArrayToGetJustItems(globalVars.userInventoryObjArray)
    questionData.offerQuestion.choices = [...globalVars.userInventoryItems]
}


export function renderInventoryItemDetailsInUl(ul, inventory) {
    for (var item of inventory) {
        var name = item.item.item_name
        var description = item.item.description

        appendLiToUl(ul, `Item name: ${name}`)
        appendLiToUl(ul, `Description: ${description}`)
        appendLiToUl(ul, "&nbsp;")
    }
}

export function findDescriptionBasedOnItemNameInJson(itemNameToSearch, objArray) {
    // console.log("findDescriptionBasedOnItemNameInJson() itemNameToSearch and objArray_________",itemNameToSearch, objArray)
    let foundItemObj = objArray.find(itemObj => itemObj.item.item_name === itemNameToSearch);
    let foundDescription = foundItemObj.item.description
    console.log("findDescriptionBasedOnItemNameInJson() foundDescription",foundDescription)
    return foundDescription
}

export function findIdBasedOnItemNameInJson(itemNameToSearch, objArray) {
    console.log("findIdBasedOnItemNameInJson() objArray",objArray)
    // console.log("findDescriptionBasedOnItemNameInJson() itemNameToSearch and objArray_________",itemNameToSearch, objArray)
    let foundItemObj = objArray.find(itemObj => itemObj.item.item_name === itemNameToSearch);
    let foundId = foundItemObj.item.item_id
    console.log("findIdBasedOnItemNameInJson() foundId",foundId)
    return foundId
}

async function renderUserInventory() {
    showInventoryContainer()
    globalVars.userInventoryObjArray = await fetchInventory('barf')
    globalVars.userInventoryItems = parseInventoryObjArrayToGetJustItems(globalVars.userInventoryObjArray)
    clearUl(inventoryUl)
    renderInventoryItemDetailsInUl(inventoryUl, globalVars.userInventoryObjArray)
}

function showInventoryContainer() {
    inventoryContainer.style.display = 'flex';
}

function hideInventoryContainer() {
    inventoryContainer.style.display = 'none';
}

window.addEventListener('keydown', async function(e) {
    if (e.key === 'e') {
        console.log("e key pressed____________")
        if (globalVars.inventoryToggledOn) {
            hideInventoryContainer()
            enableWASD()
            globalVars.inventoryToggledOn = false
        } else {
            renderUserInventory()
            disableWASD()
            globalVars.inventoryToggledOn = true
        }
    }
    else if (e.code === 'Escape' && globalVars.inventoryToggledOn) {
        hideInventoryContainer()
        enableWASD()
        globalVars.inventoryToggledOn = false
    }
    else if (e.key === 't') {
        //?for testing purposes
        console.log("t key pressed____________")
    }
})