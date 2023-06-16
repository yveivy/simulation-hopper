import { useState, useContext } from 'react'
import { createPromptForNpcResponseToChat, createPromptRobotResponseToChat, fetchOpenAiApi, formatDialogueForPrompt } from '../../../utils/ai';
import { DialogueContext} from './Chat';
import { fetchOneCharacterData } from '../../../utils/db/fetches';
import "../../../css/overlay1.css"

export const TextInput = () => {
    // var interactionObject = window.interactionObject
    // var interactionObject = "violet"

    const { addDialogue, dialogueList } = useContext(DialogueContext);
    const [inputText, setInputText] = useState("");

    const handleSubmit = async (event) => {
        var interactionObject = window.interactionObject
        console.log("interactionObject_______", interactionObject)
        
        event.preventDefault();
        const localCopyOfDialogueList = [...dialogueList, {speaker: 'Barf', text: inputText}]; //local copy
        addDialogue('Barf', inputText);
        var chatHistory = formatDialogueForPrompt(localCopyOfDialogueList)
        var npcFullName;
        var prompt;
        if (interactionObject === "") {
            // interactionObject = "robot"
            prompt = createPromptRobotResponseToChat(chatHistory)
            npcFullName = "Robot"
        } else {
            var npcData = await fetchOneCharacterData(interactionObject)
            console.log(`npcData for ${interactionObject}_____________`, npcData)
            prompt = createPromptForNpcResponseToChat(npcData.full_name, npcData.bio, npcData.role, chatHistory)
            npcFullName = npcData.full_name
        }
        const npcResponse = await fetchOpenAiApi(prompt); // Some function that generates NPC response
        addDialogue(npcFullName, npcResponse); // NPC's dialogue
        console.log("TextInput.js dialogueList_______", localCopyOfDialogueList)
        setInputText(''); // Clear the input field
    };

    const handleTextAreaKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(event);
        }
    };

    return (
        <div id="text-input-container">
            <form id="chat-input-form" onSubmit={handleSubmit}>
                <textarea
                    id = "chat-input"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleTextAreaKeyDown}
                />
                <button type="submit" id="submit-chat-button">Submit</button>
            </form>
        </div>
    );
}

export default TextInput