import {parseInventoryObjToGetJustItems} from "./inventory"
// import { fetchInventory } from "./db/fetches";

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
`You are an npc in a scifi themed RPG called simulation hopper. User has crash landed on your simulation, and he is interacting with you and other NPCs to eventually get the items he needs to get off the simulation. In the meantime, He is chatting you up.
Here's a little information about you:
Role- ${role}
Bio- ${bio}

${chatHistory}
${name}:

Give me your verbal response in quotes to what user just said. Don't respond with anything outside the quotes, or it will mess up the program`

console.log("createPromptForNpcResponseToChat_______________", prompt)
return prompt
}


export function createPromptRobotResponseToChat(chatHistory, userObjectives) {

var prompt = 
`You are an npc in a scifi themed RPG called simulation hopper. The user has landed on a planet, and he is trying to interact with a few of the NPCs to get the items he needs to leave.
You are his robot best friend who knows everything (you crash landed with him), but is programmed with a wierd quirk that only lets you give information in very cryptic, riddle form. You never just straight up give the information the user needs (that would make the game boring).
The user's current objectives:
${userObjectives}
Remember to be very vague, poetic and cryptic in your assistance to Barf. Talk only in riddles. This is very important.

${chatHistory}
Robot:

Give me your verbal response in quotes to what user just said. Don't respond with anything outside the quotes, or it will mess up the program`

console.log("createPromptForRobotAdvice_______________", prompt)
return prompt
}


export function createPremisePromptFor20Questions() {
var prompt = 
`You are a bot in a 20 questions minigame. Come up with something for the user to guess. It must be an animal that leather can be theoretically be made out of. It can be silly, but it must be an animal the average person would have heard of one could theoretically make pants of. Don't return the same word every time. Just tell me the word in quotes. Don't say anything besides the word in quotes or it will mess up the program`
return prompt
}

export function createResponsePromptFor20Questions(secretWord, question) {
var prompt = 
`You are a bot in a 20 questions minigame. It is always set to be an animal that leather can theoretically be made out of. The user will ask you clarifying questions about the animal or straight up guess what it is. You can only respond with "Yes", "No" , "Maybe", "Sometimes" or, in the case that the user approximately guesses the animal correctly, respond with "Correct". Make sure your answer is in quotes and that you say nothing else outside of quotes or it will mess up the program.

The animal the user is trying to guess is: ${secretWord} 

Here is what the user just said:
User: ${question}`

console.log(`createResponsePromptFor20Questions()________`, prompt)
return prompt
}

//Zara Poetry Game

export function createPromptForPoemChallenge() {
    var prompt = 
    `You are an AI npc in a sci-fi themed RPG called simulation hopper. The user has landed on a planet, and he is trying to interact with a few of the NPCs to get the items he needs to leave. What he needs from you is a tool to repair his spaceship that was damaged when it crash landed. You really aren't interested in anything he has to trade but you are willing to let him earn the tool. You like poetry and if he is willing to recite a poem that you like, you will happily give him the tool he is looking for. To generate the challenge you will generate a topic for the user to write a poem about. The topic can be anything ranging from nature, emotions, to abstract concepts but please provide a variety of words and don't return the same word every time. Just tell me the word in quotes. Don't say anything besides the word in quotes or it will mess up the program. `
    return prompt
}

export function createPromptForPoemRating(poem, topic) {
    var prompt =
    `You are an AI asked to rate a user-submitted poem based on the given topic. The poem the user submitted is:
    
    "${poem}"
    
    The topic they were asked to write about is "${topic}".
    
    Please rate the poem on a scale from 1 to 5, with 5 being the highest. The rating should be based on how well the poem adheres to the topic and its overall quality.
    
    Just tell me the number in quotes. Don't say anything besides the number in quotes or it will mess up the program.`

    console.log('createPromptforPoemRating()_________________________', prompt);

    return prompt
}

export function createNextPromptForTextEnvironmentGame(environmentAndContainer, history) {
    var prompt = 
`The user is navigating a text based environment and searching for a container of some sort. The user should find it in 3 directions or less ideally. If they find it, return "found".

${environmentAndContainer}


This is the log of the user's directions and previous descriptions of the environment:
${history}


Your response should be one of two things:
Unless the user mentions whatever the container is, describe the current scene in response to the User's most recent navigation command while dropping hints about where the container is. (Put your description in quotes with nothing outside of quotes or it will mess up the program.)

If the user HAS mentioned whatever the container is, simply return in quotes: “found”. (Don't say any extra words or it will mess up the program.)`
    console.log("createNextPromptForTextEnvironmentGame______", prompt)    
    return prompt
}

export function createPremisePromptForTextEnvironmentGame() {
    var prompt =
`You are creating a concept for a text based environment for the user to navigate. The user's goal while navigating the environment is find "the key to the user's success" stored in a container. (what the container is will depend on what the concept of the environment is. ie if I'm navigating old man's childhood home, the container might be a sock drawer. The container shouldn't have a lock on it or anything. It should be something that is easy to open when you find it.) The environment should be relatively small area and should be described in 3 sentences or less, and ideally the container would be fairly obvious to find.
Let me know an overview description for the text based environment and what the target container in the environment will be. Put your response in the following format:
{"environmentOverview": "example concept", "container": "example container"}`
    console.log("createPremisePromptForTextEnvironmentGame____________", prompt)
    return prompt
}



export function formatDialogueForPrompt(dialogueList) {
    var formattedAndInListForm = []
    dialogueList.forEach((dialogue, index) => (
        formattedAndInListForm.push(`${dialogue.speaker}: ${dialogue.text}`)
    ))
    var chatHistory = formattedAndInListForm.join("\n")
    return chatHistory
}


// export async function updateCurrentObjective() {
//     var currentObjective = ""
//     // var userInventory = fetchInventory("barf")
//     // var inventoryItems = parseInventoryObjToGetJustItems(userInventory)
//     // if ( inventoryItems.includes("") && !inventoryItems.includes("") ) {
//         currentObjective = ""
//     }
//     return currentObjective
// }


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