import { questionData } from "./interactionMenu.js";
import {fetchInventory } from "./db/fetches"

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
    // questionData.receiveQuestion.choices = [...window.globalVars.npcInventoryItems]
    window.globalVars.userInventoryItems = parseInventoryObjArrayToGetJustItems(window.globalVars.userInventoryObjArray)
    // questionData.offerQuestion.choices = [...window.globalVars.userInventoryItems]
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