import React, {useState} from "react"
import "../../../css/overlay1.css"
import Dialogue from "../chat/Dialogue"
import TextInput from "../chat/TextInput";
import TaylorGame from "./TaylorGame"



const Taylor = ({inventoryItems, handleClose}) => {
    const [showGame, setShowGame] = useState(false);

    const handleStartGame = () => {
        setShowGame(true);
    }

    inventoryItems = ["none"]

  return (
        <div id="taylor-container">
        {!inventoryItems.includes("striders") && !showGame ? (
            <div id="storyline">
                <p>Taylor Tuck: Hello my pantsless fella. Boy do I have just the thing for you.</p> 
                <p>I’ll give you a fresh pair of pants if you can guess what I made them out of. I have an artisen’s passion for crafting out of all kinds of materials one may not even think you can make pants out of. Want to play?</p>
                <div id="response-options">
                    <button onClick={handleClose}>Tell Taylor he can kiss your bare ass</button>
                    <button onClick={handleStartGame}>"Let's play"</button>
                </div>
            </div>
        ) : (
        <div className="interaction-container" id="chat-container">

                <Dialogue />
                <TextInput specialFeature={true}/>
                {/* <TextInput /> */}
            
            {/* <TaylorGame /> */}
        </div>
        )}
        </div>
  )
}

export default Taylor;
