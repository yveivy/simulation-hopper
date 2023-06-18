import { useState, useContext, useEffect } from 'react'
import { createPremisePromptFor20Questions, createPromptForNpcResponseToChat, createPromptRobotResponseToChat, createResponsePromptFor20Questions, fetchOpenAiApi, formatDialogueForPrompt } from '../../../utils/ai';
import { DialogueContext} from '../Interaction';
import { fetchOneCharacterData } from '../../../utils/db/fetches';
import "../../../css/overlay1.css"
import { updateUserObjectives } from '../../../utils/inventory';

export const TextInput = ({specialFeatures=false}) => {
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