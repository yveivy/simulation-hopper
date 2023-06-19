import React, {useState} from "react"
import "../../../css/overlay1.css"
import Dialogue from "../chat/Dialogue"
import TextInput from "../chat/TextInput";
import {fetchOpenAiApi, createPremisePromptFor20Questions} from "../../../utils/ai"



const Taylor = ({inventoryItems, handleClose}) => {
    const [showGame, setShowGame] = useState(false);

    const handleStartGame = async () => {
        setShowGame(true);
    }

    inventoryItems = ["none"]

  return (
        <div className='special-features-container' id="taylor-container">
        {!inventoryItems.includes("striders") && !showGame ? (
            <div id="storyline">
                <p>Taylor Tuck: Hello my pantsless fella. Boy do I have just the thing for you.</p> 
                <p>I’ll give you a fresh pair of pants if you can guess what animal I made the leather for them from. Want to play?</p>
                <div className="response-options">
                    <button className="btn" onClick={handleClose}>Tell Taylor he can kiss your bare ass</button>
                    <button className="btn" onClick={handleStartGame}>"Let's play"</button>
                </div>
            </div>
        ) : (
        <div id="game-container">

                <Dialogue />
                <TextInput specialFeatures={true}/>
                {/* <TextInput /> */}
            
            {/* <TaylorGame /> */}
        </div>
        )}
        </div>
  )
}

export default Taylor;
