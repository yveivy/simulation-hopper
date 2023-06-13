// import React, { useEffect } from "react"
// import { fetchCharacterData, questionData, finishInteraction, askEitherQuestionType, processTradeOffer, processChatMessage, clearUl, showInteractionContainer, setInteractionModeFlag, populateInteractionContainerWithNpcData, disableWASD, enableWASD, getRadioInputValue, getTextInputValue} from "../utils/interactionMenu";
// import { fetchResetInventoryData, retrieveInventoryData, renderInventoryItemDetailsInUl} from "../utils/inventory";

// const InteractionOverlay = () => {
//     var dialogueUl = document.getElementById('dialogueUl');

//     useEffect(() => {
//         const handleKeyDown = async (e) => {
//             if (e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd') {
//                 return
//             }
//             retrieveInventoryData()
//             const endGameItems = ['Botanical Elixir ', 'Aetheric Spanner']
//             const hasEndGameItems = endGameItems.every(item => window.globalVars.userInventoryItems.includes(item))
//             if (e.key === ' ' && window.globalVars.currentQuestionIndex == 0 && window.interactionObject!='') {
//                 disableWASD()  
//                     if (window.interactionObject === 'Spaceship' && hasEndGameItems) {
//                         //! uncomment this function call after moving slideshow functions from gameboard to react: endGame()
//                         //! possibly use this function depending on new endgame logic fetchResetInventoryData()
//                     } else if (window.interactionObject === 'Spaceship' && !hasEndGameItems){
//                         console.log("interactionMenu.js eventListener: You can't leave in your spaceship yet. You need to get something to restore the plantlife on your home planet and something to repair your ship.")
//                         //ToDo: render message on the screen to the effect of "You can't leave in your spaceship yet. You need to get something to restore plantlife on your planet and something to repair your ship."
//                         enableWASD()
//                         return
//                     }   
//                 window.globalVars.npcDataObject = await fetchCharacterData(window.interactionObject)
//                 populateInteractionContainerWithNpcData(window.globalVars.npcDataObject)
//                 showInteractionContainer()
//                 askEitherQuestionType(questionData.interactionModeQuestion)
//                 window.globalVars.currentQuestionIndex ++
//             } else if (e.code === 'Enter' && window.globalVars.currentQuestionIndex == 1) {
//                 var interactionModeInputValue = getRadioInputValue()
//                 if (!interactionModeInputValue) {
//                     console.log("Tried to press enter before any input option selected")
//                     return
//                 }
//                 setInteractionModeFlag(interactionModeInputValue)
//                 if (window.globalVars.trade) {
//                     console.log('EventListener() trade chosen; userInventoryItems________',window.globalVars.userInventoryItems)
//                     askEitherQuestionType(questionData.offerQuestion)
//                     renderInventoryItemDetailsInUl(dialogueUl, window.globalVars.userInventoryObjArray)
//                 } else if (window.globalVars.chat) {
//                     askEitherQuestionType(questionData.chatQuestion)
//                 }
//                 window.globalVars.currentQuestionIndex ++ 
//             } else if (e.code === 'Enter' && window.globalVars.chat && window.globalVars.currentQuestionIndex >= 2) { 
//                 window.globalVars.chatInputValue = getTextInputValue()
//                 if (window.globalVars.chatInputValue=="") {
//                     console.log("Tried to press enter before any input option selected")
//                     return
//                 }
//                 window.globalVars.dialogueList.push(`User: "${window.globalVars.chatInputValue}"`)
//                 window.globalVars.currentQuestionIndex ++
//                 processChatMessage(window.globalVars.chatInputValue)
//             } else if (e.code === 'Enter' && window.globalVars.trade && window.globalVars.currentQuestionIndex == 2) {
//                 window.globalVars.tradeRequestData.itemOfferedByUser = getRadioInputValue()
//                 if (!window.globalVars.tradeRequestData.itemOfferedByUser) {
//                     console.log("Tried to press enter before any input option selected")
//                     return
//                 }
//                 askEitherQuestionType(questionData.receiveQuestion)
//                 clearUl(dialogueUl)
//                 renderInventoryItemDetailsInUl(dialogueUl, window.globalVars.npcInventoryObjArray)
//                 window.globalVars.currentQuestionIndex ++
//             } else if (e.code === 'Enter' && window.globalVars.trade && window.globalVars.currentQuestionIndex == 3) {
//                 window.globalVars.tradeRequestData.itemRequestedByUser = getRadioInputValue()
//                 if (!window.globalVars.tradeRequestData.itemRequestedByUser) {
//                     console.log("Tried to press enter before any input option selected")
//                     return
//                 }
//                 window.globalVars.currentQuestionIndex ++ 
//                 clearUl(dialogueUl)
//                 processTradeOffer()
//             } else if (e.code === 'Escape' && window.globalVars.currentQuestionIndex > 0) {
//                 console.log("interactionMenu.js eventListener escape-key__________")
//                 finishInteraction()
//                 enableWASD()
//             }
//         }

//         window.addEventListener("keydown", handleKeyDown)

//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//         };
//     }, []);


//     return (
//         <div id="interactionContainer">
//             <div id="userInputAndDialogueContainer">
//             <div id='userInputContainer'></div>
//             <div id="dialogueContainer">
//                 <ul id="dialogueUl"></ul>
//             </div>
//         </div>

//             <div id="npcDetailsContainer">
//             <div id="npcNameContainer">
//                 {/* <h2 id="npcName"></h2> */}
//             </div>
//             <div id="npcHeadshotContainer">
//             </div>
//             <div id="npcBioContainer">
//             </div>
//             </div>            
//         </div>
//         )
// }
// export default InteractionOverlay