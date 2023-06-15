import { useState } from 'react'
import { fetchOpenAiApi } from '../../../utils/ai';
import { useDialogue } from '../../../utils/dialogue';
import "../../../css/overlay1.css"

export const TextInput = () => {
    // var interactionObject = window.interactionObject
    var interactionObject = "NPC"

    const { addDialogue } = useDialogue()
    const [inputText, setInputText] = useState("");

    const handleSubmit = (event) => {
        console.log("TextInput.js submit text_______")
        event.preventDefault();
        addDialogue('Barf', inputText); // User's dialogue
        //ToDO: choose prompt (based on user) 
        var prompt = "test prompt"
        const npcResponse = fetchOpenAiApi(prompt); // Some function that generates NPC response
        addDialogue(interactionObject, npcResponse); // NPC's dialogue
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