import { useState, useContext } from 'react'
import { createPromptForNpcResponseToChat, fetchOpenAiApi, formatDialogueForPrompt } from '../../../utils/ai';
import { DialogueContext} from './Chat';
import "../../../css/overlay1.css"

export const TextInput = () => {
    // var interactionObject = window.interactionObject
    var interactionObject = "Violet"

    const { addDialogue, dialogueList } = useContext(DialogueContext);
    const [inputText, setInputText] = useState("");

    const handleSubmit = async (event) => {
        
        event.preventDefault();
        const localCopyOfDialogueList = [...dialogueList, {speaker: 'Barf', text: inputText}]; //local copy
        addDialogue('Barf', inputText); // User's dialogue
        //ToDO: choose prompt (based on user) 
        // var prompt = "test prompt"
        //ToDo: get bio for character
        
        if (window.interactionObject)
        var chatHistory = formatDialogueForPrompt(localCopyOfDialogueList)
        var reqObj = {"name": "Violet", "role": "Botanist", "bio": "loves plants and is hot redhead", "chatHistory": chatHistory}
        var prompt = createPromptForNpcResponseToChat(reqObj)
        const npcResponse = await fetchOpenAiApi(prompt); // Some function that generates NPC response
        addDialogue(interactionObject, npcResponse); // NPC's dialogue
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