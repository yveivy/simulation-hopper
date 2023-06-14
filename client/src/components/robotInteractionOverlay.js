import React, { useRef, useEffect } from "react"
import { createChatPromptFetchReqObj, createTradeRequestPromptFetchReqObj, removeAnythingOutsideOfQuotes, resetInteractionGlobalVars, questionData, setInteractionModeFlag, disableWASD, enableWASD} from "../utils/interactionMenu";
import { retrieveInventoryData} from "../utils/inventory";
import { fetchCharacterData } from "../utils/db/fetches";
import { fetchOpenAiApi, createPromptForNpcResponseToChat, createPromptForNpcResponseToTradeRequest} from "../utils/ai.js"

const InteractionOverlay = () => {
    const interactionContainer = useRef(null);
    const userInputContainer = useRef(null);
    const dialogueContainer = useRef(null);
    const dialogueUl = useRef(null);
    const npcBioContainer = useRef(null);
    const npcNameEl = useRef(null);
    const npcHeadshotContainer = useRef(null);

    useEffect(() => {
        const handleKeyDown = async (e) => {
            if (e.key === 'r') {
                return
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    return (
        <div ref={interactionContainer} id="interactionContainer">
            <div id="userInputAndDialogueContainer">
                <div ref={userInputContainer} id='userInputContainer'></div>
                <div ref={dialogueContainer} id="dialogueContainer">
                    <ul ref={dialogueUl} id="dialogueUl"></ul>
                </div>
            </div>
            <div id="npcDetailsContainer">
                <div id="npcNameContainer">
                    {/* <h2 id="npcName"></h2> */}
                </div>
                <div ref={npcHeadshotContainer} id="npcHeadshotContainer"></div>
                <div ref={npcBioContainer} id="npcBioContainer"></div>
            </div>            
        </div>
        )
}
export default InteractionOverlay