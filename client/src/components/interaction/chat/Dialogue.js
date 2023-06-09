import React, { useContext } from "react"
import { DialogueContext} from '../Interaction';

// import "../../../css/overlay1.css"

// const characterImages = {
//   "zara": "/game/images/zara-sparks.png",
//   "violet": "/game/images/violet-meadows.png",
//   "taylor": "/game/images/taylor-tuck.png",
//   "shady": "/game/images/shady-schemer.png",
//   "hydra": "/game/images/beryl-and-basil-hydra.png",
//   "abe": "/game/images/abe-harmony.png"
// }


const Dialogue = () => {

  const { dialogueList } = useContext(DialogueContext)
//added game to url so deleted to fix repeat
  var interactionObject = window.interactionObject
  if (interactionObject === "") {
    interactionObject = "robot"
  } 
  const currentCharacter = `images/characterHeadshots/${interactionObject}.png`;
  
  return (
    <div id="dialogue-container" >
      <ul style={{margin: "45px"}}className="dialogue-ul" id="dialogue-text">
        {dialogueList.map((dialogue, index) => (
          <li key={index}>
            {dialogue.speaker}: {dialogue.text}
          </li>
        ))}
      </ul>
          {/* {currentCharacter && <img src={characterImages[currentCharacter]} alt="Character Image" id="dialogue-img"/>} */}
            <img src={currentCharacter} alt="Character" id="dialogue-img"/>
    </div>
  );
}

export default Dialogue;