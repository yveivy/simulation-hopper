import {parseInventoryObjToGetJustItems} from "./inventory"
import { fetchInventory } from "./db/fetches";

export async function fetchOpenAiApi(prompt) {
    var promptResponseNotJson = await fetch('/api/openai/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: prompt,
        }),
    })

    var promptResponse = await promptResponseNotJson.json();
    console.log("fetchOpenAiApi() promptResponse___________", promptResponse)
    return promptResponse
}


export function createPromptForNpcResponseToTradeRequest(reqObj) {
    var bio = reqObj.bio
    var role = reqObj.role
    
    var npcInventoryItems = reqObj.userInventoryItems
    var userInventoryItems = reqObj.npcInventoryItems
    var itemOfferedByUser = reqObj.itemOfferedByUser
    var descriptionOfItemOfferedByUser = reqObj.descriptionOfItemOfferedByUser
    var itemRequestedByUser = reqObj.itemRequestedByUser
    var descriptionOfItemRequestedByUser = reqObj.descriptionOfItemRequestedByUser
    var offerDecision = reqObj.offerDecision

var prompt = 
`You are an npc in a scifi themed trading-oriented RPG called simulation hopper. User has crash landed on your simulation, and he is trying to trade with you and other NPCs to eventually get the items he needs to get off the simulation. The different NPCs value items differently depending on their personal preferences. Their personal preferences regarding various items will alter their willingness to accept the user's offers to trade.
Here's a little information about you:
Role- ${role}
Bio- ${bio}.
Your inventory: ${npcInventoryItems}
User inventory: ${userInventoryItems}

The user offered to trade his: ${itemOfferedByUser}
Description: ${descriptionOfItemOfferedByUser}

He has requested your: ${itemRequestedByUser}
Description: ${descriptionOfItemRequestedByUser}

You ${offerDecision} his offer:
Give me your verbal response in quotes to his offer. Don't respond with anything outside the quotes, or it will mess up the program
`
console.log("createPromptForNpcResponseToTradeRequest_______________", prompt)
    return prompt
}


export function createPromptForNpcResponseToChat(name, bio, role, chatHistory) {


var prompt = 
`You are an npc in a scifi themed trading-oriented RPG called simulation hopper. User has crash landed on your simulation, and he is trying to trade with you and other NPCs to eventually get the items he needs to get off the simulation. In the meantime, He is chatting you up.
Here's a little information about you:
Role- ${role}
Bio- ${bio}

${chatHistory}
${name}:

Give me your verbal response in quotes to what user just said. Don't respond with anything outside the quotes, or it will mess up the program`

console.log("createPromptForNpcResponseToChat_______________", prompt)
return prompt
}


export function createPromptRobotResponseToChat(chatHistory) {

var prompt = 
`You are an npc in a scifi themed trading-oriented RPG called simulation hopper. The user has landed on a planet, and he is trying to trade with NPCs to eventually get the items he needs to leave.
You are his robot best friend who knows everything (you crash landed with him), but is programmed with a wierd quirk that only lets you give information in very cryptic, riddle form. You never just straight up give the information the user needs (that would make the game boring).
The user's next objective that you can subtly help him with-
He must talk to Violet Meadows to get the botanical elixir to save his planet. She has it but the first interaction won't go well because she won't like that he don’t have pants. He's not going to get anywhere with her until he finds pants. There isn’t a mall nearby but there is a tailor shop. After talking to Violet, direct Barf to find the tailor’s shop, owned by Taylor Tuck so that he can get his pants. Alternatively you could encourage him to figure out how to repair his ship first by visiting the Mechanics shop owned by Zara. She is known for being able to repair anything.
Remember to be very vague, poetic and cryptic in your assistance to Barf. Talk only in riddles. This is very important.
${chatHistory}
Robot:

Give me your verbal response in quotes to what user just said. Don't respond with anything outside the quotes, or it will mess up the program`

console.log("createPromptForRobotAdvice_______________", prompt)
return prompt
}

export function createPrompt(){

}

export function formatDialogueForPrompt(dialogueList) {
    var formattedAndInListForm = []
    dialogueList.forEach((dialogue, index) => (
        formattedAndInListForm.push(`${dialogue.speaker}: ${dialogue.text}`)
    ))
    var chatHistory = formattedAndInListForm.join("\n")
    return chatHistory
}


export async function updateCurrentObjective() {
    var currentObjective = ""
    var userInventory = fetchInventory("barf")
    var inventoryItems = parseInventoryObjToGetJustItems(userInventory)
    if ( inventoryItems.includes("") && !inventoryItems.includes("") ) {
        currentObjective = ""
    }
    return currentObjective
}


//increment checkpoint to user save file
var storyLine = [
    {
        "checkpoint": 0,
        "npc": "robot",
        "openingScene": "",
        "objective": "",
        "objectiveComplete": false
    },
    {
        "checkpoint": 1,
        "npc": "violet",
        "openingScene": "Why are you not wearing pants! You are so cute. Maybe I would have a crush on you if you shaped up a bit. I’m so disgusted by your pantslessness. I love to grow plants. I’m a fantastic botanist. I heard that you need something to grow plantlife back on your planet, and I have just the thing.",
        "objective": "Go talk to the taylor to get a pair of pants",
        "objectiveComplete": false
    },
    {
        "checkpoint": 2,
        "npc": "",
        "openingScene": "",
        "objective": "",
        "objectiveComplete": false
    },
    {
        "checkpoint": 3,
        "npc": "",
        "openingScene": "",
        "objective": "",
        "objectiveComplete": false
    },
    {
        "checkpoint": 4,
        "npc": "",
        "openingScene": "",
        "objective": "",
        "objectiveComplete": false
    }
]