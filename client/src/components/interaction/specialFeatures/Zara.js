import React, {useState} from "react"
// import "../../../css/overlay1.css"
import Dialogue from "../chat/Dialogue"
import TextInput from "../chat/TextInput";
import {fetchOpenAiApi, createPremisePromptFor20Questions} from "../../../utils/ai"


// Setup special feature for zara:
// -ai.js createPremisePromptForRatingGame
// -ai.js createRankingPromptForRatingGame
// Ensure prompt response is a ranking:
// -ai.js ensureRanking function
// Recursive try catch (/if else) (try checks for number between 1-5), (catch calls itself). 
// -specialFeatures.js  
// Switch conditional on interactionObject check for zara-> Zara.js
// -Zara.js fetchInventory(barf)
// If !repairTool:
// Text (b:*sees the tool to repair a ship in Zara’s inventory* Z: I get so bored out here. I’ll give you the tool and help you fix your ship if you humor me and beat my challlenge)
// Button (accept challenge):

// Button (tell her to F off) (same as escape button (pass as prop to Zara component)
// Else (already has repair tool):
// <Dialogue (ZaraDialogue.js?) />
// <InputText  />  ( createDialogueListForZaraGame() )
// 1. Premise
// 2. Ranking
// 3. End challenge conditional message (fail, success, ( repairTool ? Victory scene and inventory swap) play again button hides than reloads the Zara component 


const Taylor = ({inventoryItems, handleClose}) => {
    const [showGame, setShowGame] = useState(false);

    const handleStartGame = async () => {
        setShowGame(true);
    }

    inventoryItems = ["none"]

  return (
        <div id="taylor-container">
        {!inventoryItems.includes("repairTool") && !showGame ? (
            <div id="storyline">
                <p>*Barf sees the tool to repair a ship in Zara’s inventory*</p>
                <p> Zara Sparks: I get so bored out here. I’ll give you the tool and help you fix your ship if you humor me and beat my challenge</p>
                <div id="response-options">
                    <button onClick={handleClose}>"Yeah right"</button>
                    <button onClick={handleStartGame}>Accept Challenge</button>
                </div>
            </div>
        ) : (
        <div className="interaction-container" id="chat-container">
            <Dialogue />
            <TextInput specialFeatures={true}/>
        </div>
        )}
        </div>
  )
}

export default Taylor;
