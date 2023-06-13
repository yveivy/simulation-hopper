import { questionData } from "./interactionMenu.js";
import { appendLiToUl, disableWASD, enableWASD, clearUl} from "./interactionMenu.js";
import client from './apolloClient'
import { QUERY_INVENTORY } from './queries.js';
var inventoryContainer = document.querySelector("#inventory-container")
var inventoryUl = document.querySelector("#inventory-ul")

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
        });
        console.log(data);
        return data.characters[characterSearchableName]
      } catch (error) {
        console.error(error);
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
    window.globalVars.npcInventoryObjArray = await fetchInventory(window.interactionObject)
    window.globalVars.userInventoryObjArray = await fetchInventory('barf')
    window.globalVars.npcInventoryItems = parseInventoryObjArrayToGetJustItems(window.globalVars.npcInventoryObjArray)
    questionData.receiveQuestion.choices = [...window.globalVars.npcInventoryItems]
    window.globalVars.userInventoryItems = parseInventoryObjArrayToGetJustItems(window.globalVars.userInventoryObjArray)
    questionData.offerQuestion.choices = [...window.globalVars.userInventoryItems]
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

export async function renderUserInventory() {
    showInventoryContainer()
    window.globalVars.userInventoryObjArray = await fetchInventory('barf')
    window.globalVars.userInventoryItems = parseInventoryObjArrayToGetJustItems(window.globalVars.userInventoryObjArray)
    clearUl(inventoryUl)
    renderInventoryItemDetailsInUl(inventoryUl, window.globalVars.userInventoryObjArray)
}

export function showInventoryContainer() {
    inventoryContainer.style.display = 'flex';
}

export function hideInventoryContainer() {
    inventoryContainer.style.display = 'none';
}

window.addEventListener('keydown', async function(e) {
    if (e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd' || e.key === " ") {
        return
    }
    if (e.key === 'e') {
        console.log("e key pressed____________")
        if (window.globalVars.inventoryToggledOn) {
            hideInventoryContainer()
            enableWASD()
            window.globalVars.inventoryToggledOn = false
        } else {
            renderUserInventory()
            disableWASD()
            window.globalVars.inventoryToggledOn = true
        }
    }
    else if (e.code === 'Escape' && window.globalVars.inventoryToggledOn) {
        hideInventoryContainer()
        enableWASD()
        window.globalVars.inventoryToggledOn = false
    }
    else if (e.key === 't') {
        //?for testing purposes
        console.log("t key pressed____________")
    }
})