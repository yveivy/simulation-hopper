import { useState, useContext, useEffect } from 'react'
import {  createPremisePromptFor20Questions, createPromptForNpcResponseToChat, createPromptRobotResponseToChat, createResponsePromptFor20Questions, fetchOpenAiApi, formatDialogueForPrompt } from '../../../utils/ai';
import { DialogueContext} from '../Interaction';
import { fetchOneCharacterData } from '../../../utils/db/fetches';
// import "../../../css/overlay1.css"
import { updateUserObjectives } from '../../../utils/inventory';
import { useMutation, gql } from '@apollo/client';

export const TextInput = ({ specialFeatures=false }) => {
    var interactionObject = window.interactionObject


    const { addDialogue, dialogueList, handleClose } = useContext(DialogueContext);
    const [inputText, setInputText] = useState("");

    const [secretWord, setSecretWord] = useState("")
    // const [ratingGamePremise, setRatingGamePremise] = useState("")

    const playerToken = localStorage.getItem('nekotsresueht')
    const WIN_ITEM = gql`
    mutation MyMutation($token: String!, $characterName: String!, $item: String!) {
      winItem(token: $token, characterName: $characterName, item: $item)
    }
  `;
    const [winItem] = useMutation(WIN_ITEM);

    useEffect(() => {
        const setupSpecialFeature = async () => {
            console.log("specialFeatures_______", specialFeatures)
    
            if (specialFeatures===true) {
                if (interactionObject === "taylor" && dialogueList.length < 1) {
                    var secretWordString = await fetchOpenAiApi(createPremisePromptFor20Questions())
                    setSecretWord(secretWordString)
                    addDialogue("Taylor Tuck", "Haha I'm so glad you'll humor me. Go ahead and guess what animal this leather is made out of. I'll respond with yes or no, or if you guess I'll tell you if it's correct.")
                } 
                // else if (interactionObject === "zara" && dialogueList.length < 1) {
                    // var ratingGamePremiseString = await fetchOpenAiApi(createPremisePromptForRatingGame())
                    // setRatingGamePremise(ratingGamePremiseString)
                    // addDialogue("Zara Sparks", `If you pass my challenge I'll help you. ${ratingGamePremiseString}`)
                // }
            } else {
                return
            }
        }
        setupSpecialFeature()
    }, [addDialogue, setSecretWord, dialogueList, interactionObject, specialFeatures])
    

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
                npcFullName = "Taylor Tuck"
                addDialogue('Barf', inputText)
                prompt = createResponsePromptFor20Questions(secretWord, inputText)
                npcResponse = await fetchOpenAiApi(prompt)
                if (npcResponse === `"Correct"` || npcResponse === `"Correct."` || npcResponse === `Correct` || npcResponse === `Correct.`) {
                    npcResponse = `You guessed it! I made the leather of these pants out of ${secretWord}! Enjoy! Btw, that pretty redhead violet will probably fall in love with you when she sees in you pants this handsome. *Taylor puts the ${secretWord} leather pants in your inventory*`;
                    //swap pants to barf's inventory
                    localStorage.setItem('striders', true)
                    winItem({
                    variables: {
                        token: playerToken,
                        characterName: 'taylor',
                        item: 'striders',
                    },
                    })
                    .then((result) => {
                        // Handle successful mutation result
                        console.log('barf got the item: true or cap?', result);
                    })
                    .catch((error) => {
                        // Handle error
                        console.error('the deal went sideways', error);
                    });
                    //close window
                    setTimeout(handleClose, 10000)
                }
            }
            //  else if (interactionObject === "zara") {
            //     npcFullName = "Zara Sparks"
            //     addDialogue("Barf", inputText)
            //     // prompt = createRankingPromptForRatingGame(inputText)
            //     var ranking = await fetchOpenAiApi(prompt)
            //     try {
            //         ranking = parseInt(ranking);
            //         if (isNaN(ranking)) throw new Error('createRankingPromptForRatingGame() did not return an integer');
            //     } catch (error) {
            //         console.error(error);
            //         // ranking = createRankingPromptForRatingGame(secretWord, inputText);
            //     }
            //     if (ranking >= 3) {
            //         npcResponse = `I'm quite impressed. I'd rate that as a ${ranking}. Thank you for making my day. I'll try to help you get home now Barf. *Zara puts the Spaceship Repair Tool in Barf's inventory*`
            //         //swap pants to barf's inventory
            //         //close window
            //         setTimeout(handleClose, 10000)
            //     } else {
            //         npcResponse = `I rate that as a ${ranking}. You're gonna have to work harder than that to impress me. You're welcome to try again.`
            //     }
            // }
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