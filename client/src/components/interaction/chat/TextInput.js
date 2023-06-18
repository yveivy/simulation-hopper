import { useState, useContext, useEffect } from 'react'
import { createPremisePromptFor20Questions, createPromptForNpcResponseToChat, createPromptRobotResponseToChat, createResponsePromptFor20Questions, fetchOpenAiApi, formatDialogueForPrompt } from '../../../utils/ai';
import { DialogueContext} from '../Interaction';
import { fetchOneCharacterData } from '../../../utils/db/fetches';
import "../../../css/overlay1.css"
import { updateUserObjectives } from '../../../utils/inventory';

export const TextInput = ({ specialFeatures=false }) => {
    var interactionObject = window.interactionObject
    // var interactionObject = 'taylor'

    const { addDialogue, dialogueList, handleClose } = useContext(DialogueContext);
    const [inputText, setInputText] = useState("");

    const [secretWord, setSecretWord] = useState("")

    useEffect(() => {
        const setup20Questions = async () => {
            console.log("specialFeatures_______", specialFeatures)
            if (specialFeatures===true && interactionObject === "taylor" && dialogueList.length < 1) {
                var secretWordString = await fetchOpenAiApi(createPremisePromptFor20Questions())
                setSecretWord(secretWordString)
                addDialogue("Taylor Tuck", "Haha I'm so glad you'll humor me. I'm so bored and love to make people play my game. I'm thinking of an animal. Go ahead and ask me questions and I'll respond with yes or no, or if you guess I'll tell you if it's correct.")
            }
        }
        setup20Questions()
    }, [addDialogue, setSecretWord, dialogueList.length, interactionObject, specialFeatures])
  

    const handleSubmit = async (event) => {
        
        console.log("interactionObject_______", interactionObject)
        


        event.preventDefault();
        const localCopyOfDialogueList = [...dialogueList, {speaker: 'Barf', text: inputText}]; //local copy
        var chatHistory
        var npcFullName;
        var prompt;
        var npcResponse

        if (specialFeatures === true) { 
            if (interactionObject === "taylor") {
                addDialogue('Barf', inputText)
                prompt = createResponsePromptFor20Questions(secretWord, inputText)
                npcFullName = "Taylor Tuck"
                npcResponse = await fetchOpenAiApi(prompt)
                if (npcResponse === `"Correct"` || npcResponse === `"Correct."` || npcResponse === `Correct` || npcResponse === `Correct.`) {
                    npcResponse = `You guessed it! I made the leather of these pants out of ${secretWord}! Enjoy! Btw, that pretty redhead violet will probably fall in love with you when she sees in you pants this handsome. *Taylor puts the ${secretWord} leather pants in your inventory*`
                    //swap pants to barf's inventory
                    //close window
                    setTimeout(handleClose, 10000)
                }
            }
        } else {
            addDialogue('Barf', inputText);
            chatHistory = formatDialogueForPrompt(localCopyOfDialogueList)
            if (interactionObject === "") {
                updateUserObjectives()
                prompt = createPromptRobotResponseToChat(chatHistory, window.globalVars.userObjectives)
                npcFullName = "Robot"
            } else {
                var npcData = await fetchOneCharacterData(interactionObject)
                console.log(`npcData for ${interactionObject}_____________`, npcData)
                prompt = createPromptForNpcResponseToChat(npcData.full_name, npcData.bio, npcData.role, chatHistory)
                npcFullName = npcData.full_name
            }
            npcResponse = await fetchOpenAiApi(prompt)
        }
        ; // Some function that generates NPC response
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