import { useState, useContext } from 'react'
import { createPromptForNpcResponseToChat, createPromptRobotResponseToChat, fetchOpenAiApi, formatDialogueForPrompt } from '../../../utils/ai';
import { DialogueContext} from '../Interaction';
import { fetchOneCharacterData } from '../../../utils/db/fetches';
import "../../../css/overlay1.css"
import { updateUserObjectives } from '../../../utils/inventory';

export const TextInput = (spec) => {
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
            updateUserObjectives()
            prompt = createPromptRobotResponseToChat(chatHistory, window.globalVars.userObjectives)
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
                <textarea  style={{
                    width: '100%',
                    height: '25px',
                    borderRadius: '5px',
                    padding: '10px',
                    fontSize: '16px',
                    margin: '20 0px',
                    backgroundColor: ' rgb(66, 133, 55)',
                    color: 'white',
                    
                }}
                    id = "chat-input"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleTextAreaKeyDown}
                />
                      
                <button style={{
                    height: '45px',
                    borderRadius: '5px',
                    padding: '10px',
                    fontSize: '16px',
                    margin: '20 0px',
                    backgroundColor: ' rgb(66, 133, 55)',
                    color: 'white',
                    border: 'none',
                    boxShadow: '10px 10px 20px rgba(0,0,0,0.3)',
                    transition: '0.3s ease' 
                    
                }} 
                onMouseDown={(e) => {
                    e.target.style.boxShadow = '2px 2px 5px rgba(99,157,82,0.2';
                }}

                onMouseUp={(e) => {
                    e.target.style.boxShadow = '5px 5px 10px rgba(66,133,55, 0.3';
                }}
                
                id="submit-chat-button">Submit</button>
            </form>
        </div>
    );
}

export default TextInput