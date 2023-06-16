import { questionData } from "./interactionMenu.js";
import {fetchInventory } from "./db/fetches"

export function parseInventoryObjToGetJustItems(inventoryObj) {
    var inventoryItems = Object.keys(inventoryObj).filter(key => inventoryObj[key] === true);
    console.log("parseInventoryObjToGetJustItems() inventoryItems__________", inventoryItems)
    return inventoryItems;
}

export async function retrieveInventoryData() {
    try {
        window.globalVars.npcInventoryObjArray = await fetchInventory(window.interactionObject)
        window.globalVars.userInventoryObjArray = await fetchInventory('barf')
        window.globalVars.npcInventoryItems = parseInventoryObjToGetJustItems(window.globalVars.npcInventoryObjArray)
        // questionData.receiveQuestion.choices = [...window.globalVars.npcInventoryItems]
        window.globalVars.userInventoryItems = parseInventoryObjToGetJustItems(window.globalVars.userInventoryObjArray)
        // questionData.offerQuestion.choices = [...window.globalVars.userInventoryItems]
    } catch {
        console.log ("retrieveInventoryData() failed")
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

export function updateUserObjectives() {
    var userObjectives = ""
    var userInventoryObj = fetchInventory("barf")
    var userInventory = parseInventoryObjToGetJustItems(userInventoryObj)
    if (!userInventory.includes("elixer")) {
        userObjectives += "He must talk to the beautiful red headed Violet Meadows to get the botanical elixir to save his planet. She has it but the first interaction won't go well because she won't like that he don’t have pants. He's not going to get anywhere with her until he finds pants. There isn’t a mall nearby but there is a tailor shop. After talking to Violet, direct Barf to find the tailor’s shop, owned by Taylor Tuck so that he can get his pants.\n"
    } 
    if (!userInventory.includes("repairTool")) {
        userObjectives += "To leave the planet, Barf also must figure out how to repair his ship by visiting the Mechanics shop owned by Zara. She is known for being able to repair anything. She can possibly provide him with a spaceship repair tool to fix his ship. She is known to like to play games with people and may want Barf to beat her challenge before helping him.\n"
    } 
    if (userInventory.includes("elixer") && userInventory.includes("repairTool")) {
        userObjectives = "Barf has the botantical elixer to restore plantlife on his planet and he has the spaceship repair tool to fix his ship and get home. All he needs to do is go to his ship and leave."
    }
    window.globalVars.userObjectives = userObjectives
}
//fetch user inventory, if inventory 
