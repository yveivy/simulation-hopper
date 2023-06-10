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
`You are an npc in a scifi themed trading-oriented RPG called planet hopper. User has crash landed on your planet, and he is trying to trade with you and other NPCs to eventually get the items he needs to get off the planet. The different NPCs value items differently depending on their personal preferences. Their personal preferences regarding various items will alter their willingness to accept the user's offers to trade.
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


export function createPromptForNpcResponseToChat(reqObj) {
    var role = reqObj.role
    var bio = reqObj.bio
    var chatHistory = reqObj.chatHistory

var prompt = 
`You are an npc in a scifi themed trading-oriented RPG called planet hopper. User has crash landed on your planet, and he is trying to trade with you and other NPCs to eventually get the items he needs to get off the planet. In the meantime, He is chatting you up.
Here's a little information about you:
Role- ${role}
Bio- ${bio}

${chatHistory}

Give me your verbal response in quotes to what user just said. Don't respond with anything outside the quotes, or it will mess up the program`

console.log("createPromptForNpcResponseToChat_______________", prompt)
return prompt
}
