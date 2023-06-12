import React from "react"

const InteractionOverlay = () => {

return (
    <div id="interactionContainer">
        <div id="userInputAndDialogueContainer">
        <div id='userInputContainer'></div>
        <div id="dialogueContainer">
            <ul id="dialogueUl"></ul>
        </div>
    </div>

        <div id="npcDetailsContainer">
        <div id="npcNameContainer">
            {/* <h2 id="npcName"></h2> */}
        </div>
        <div id="npcHeadshotContainer">
        </div>
        <div id="npcBioContainer">
        </div>
        </div>            
    </div>
    )
}

export default InteractionOverlay