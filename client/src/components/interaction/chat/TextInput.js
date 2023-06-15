import { useState } from 'react'
import { fetchOpenAiApi } from '../../../utils/ai';
import { useDialogue } from '../../../utils/dialogue';
import "../../../css/overlay1.css"

export const TextInput = () => {
    const { addDialogue } = useDialogue()
    const [inputText, setInputText] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        addDialogue('User', inputText); // User's dialogue
        const npcResponse = fetchOpenAiApi(inputText); // Some function that generates NPC response
        addDialogue('NPC', npcResponse); // NPC's dialogue
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