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
        
        try {
            event.preventDefault();
            addDialogue('Barf', inputText); // User's dialogue
            //ToDO: choose prompt (based on user) 
            // var prompt = "test prompt"
            const npcResponse = await fetchOpenAiApi(inputText); // Some function that generates NPC response
            addDialogue(interactionObject, npcResponse);//NPC's dialogue
            console.log("TextInput.js dialogueList_______", dialogueList)
        } catch (error) {
            console.error(error);
        } finally {
            setInputText(''); //Clear the input field
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