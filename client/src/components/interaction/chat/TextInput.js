import { useState, useContext } from 'react'
import { fetchOpenAiApi } from '../../../utils/ai';
import { DialogueContext} from './Chat';
import "../../../css/overlay1.css"

export const TextInput = () => {
    // var interactionObject = window.interactionObject
    var interactionObject = "NPC"

    const { addDialogue, dialogueList } = useContext(DialogueContext);
    const [inputText, setInputText] = useState("");

    const handleSubmit = async (event) => {
        
        event.preventDefault();
        addDialogue('Barf', inputText); // User's dialogue
        //ToDO: choose prompt (based on user) 
        // var prompt = "test prompt"
        const npcResponse = await fetchOpenAiApi(inputText); // Some function that generates NPC response
        addDialogue(interactionObject, npcResponse); // NPC's dialogue
        console.log("TextInput.js dialogueList_______", dialogueList)
        setInputText(''); // Clear the input field
    };

    return (
        <div id="text-input-container">
            <form id="chat-input-form" onSubmit={handleSubmit}>
                <textarea
                    id = "chat-input"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <button id="submit-chat-button">Submit</button>
            </form>
        </div>
    );
}

export default TextInput